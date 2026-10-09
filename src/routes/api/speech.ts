import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { characterIds, characterVoice } from "@/lib/prank-characters";

const Input = z.object({ text: z.string().trim().min(1).max(600), character: z.enum(characterIds) });

// Streams Gemini TTS SSE (24 kHz PCM deltas) straight to the browser.
export const Route = createFileRoute("/api/speech")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Input.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Type something to speak." }, { status: 400 });
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return Response.json({ error: "Voice is not configured yet." }, { status: 500 });
        const v = characterVoice[parsed.data.character];
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          signal: request.signal,
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3.1-flash-tts-preview",
            contents: [{ role: "user", parts: [{ text: `${v.style}: ${parsed.data.text}` }] }],
            generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: v.voice } } } },
            stream_format: "sse",
          }),
        });
        if (!upstream.ok || !upstream.body) {
          const msg = upstream.status === 429 ? "Too many requests — try again in a minute." : upstream.status === 402 ? "AI credits are used up for now." : "Couldn't create the voice right now.";
          return Response.json({ error: msg }, { status: upstream.status === 429 || upstream.status === 402 || upstream.status === 403 ? upstream.status : 502 });
        }
        return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream", "Cache-Control": "no-cache" } });
      },
    },
  },
});
