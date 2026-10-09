import { createParser } from "eventsource-parser";

export async function playSpeech(text: string, character: string, signal?: AbortSignal): Promise<void> {
  const context = new AudioContext({ sampleRate: 24000 });
  const sources = new Set<AudioBufferSourceNode>();
  let playhead = 0, pending = new Uint8Array(0), completed = false, played = 0;
  let playback: Promise<void> = Promise.resolve();
  const stopAll = () => { for (const s of sources) { try { s.stop(); } catch { /* already stopped */ } } };
  signal?.addEventListener("abort", stopAll, { once: true });
  try {
    if (context.state === "suspended") await context.resume();
    const res = await fetch("/api/speech", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, character }), signal });
    if (!res.ok || !res.body) {
      const body = await res.json().catch(() => null) as { error?: string } | null;
      throw new Error(body?.error ?? "Couldn't play the voice.");
    }
    const parser = createParser({
      onEvent(event) {
        const p = JSON.parse(event.data) as { type: string; audio?: string; error?: unknown };
        if (p.type === "error" || p.error) throw new Error("Couldn't create the voice right now.");
        if (p.type === "speech.audio.done") { completed = true; return; }
        if (p.type !== "speech.audio.delta" || !p.audio) return;
        const incoming = Uint8Array.from(atob(p.audio), (c) => c.charCodeAt(0));
        const bytes = new Uint8Array(pending.length + incoming.length);
        bytes.set(pending); bytes.set(incoming, pending.length);
        const usable = bytes.length - (bytes.length % 2);
        const view = new DataView(bytes.buffer);
        const samples = new Float32Array(usable / 2);
        for (let i = 0; i < samples.length; i++) samples[i] = view.getInt16(i * 2, true) / 32768;
        pending = bytes.slice(usable);
        if (!samples.length) return;
        played += samples.length;
        const buffer = context.createBuffer(1, samples.length, 24000);
        buffer.copyToChannel(samples, 0);
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        sources.add(source);
        playback = new Promise((resolve) => { source.onended = () => { sources.delete(source); resolve(); }; });
        playhead = Math.max(playhead, context.currentTime + 0.05);
        source.start(playhead);
        playhead += buffer.duration;
      },
    });
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    for (;;) { const n = await reader.read(); if (n.done) break; parser.feed(n.value); }
    if (!completed || !played) throw new Error("The voice stopped early. Try again.");
    await playback;
  } finally {
    signal?.removeEventListener("abort", stopAll);
    stopAll();
    await context.close();
  }
}
