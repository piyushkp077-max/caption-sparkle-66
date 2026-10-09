import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Play, Square, Search, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { characters, clipsFor, type CharacterId } from "@/lib/prank-characters";
import { playSpeech } from "@/lib/play-speech";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/prank-studio")({
  head: () => ({
    meta: [
      { title: "Desi Prank & Roast Studio — Caption Generate AI" },
      { name: "description", content: "Type anything and hear it in a Sweet Girl, Bihari Old Man, Desi Boy or Old Lady voice, plus 600+ funny soundboard clips." },
      { property: "og:title", content: "Desi Prank & Roast Studio" },
      { property: "og:description", content: "Funny desi character voices and a mega soundboard for laughs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrankStudio,
});

function PrankStudio() {
  const [character, setCharacter] = useState<CharacterId>("girl");
  const [text, setText] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [board, setBoard] = useState<CharacterId>("girl");
  const [q, setQ] = useState("");
  const abort = useRef<AbortController | null>(null);
  const clips = useMemo(() => clipsFor(board).filter((c) => c.toLowerCase().includes(q.toLowerCase())), [board, q]);

  const play = async (key: string, line: string, who: CharacterId) => {
    abort.current?.abort();
    if (playing === key) { setPlaying(null); return; }
    const ctrl = new AbortController();
    abort.current = ctrl;
    setError(""); setPlaying(key);
    try { await playSpeech(line, who, ctrl.signal); }
    catch (e) { if (!ctrl.signal.aborted) setError(e instanceof Error ? e.message : "Couldn't play the voice."); }
    finally { if (abort.current === ctrl) setPlaying(null); }
  };

  return (
    <div className="ambient-page min-h-screen bg-background pb-16 text-foreground">
      <header className="sticky top-0 z-30 border-b border-glass-border bg-glass px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Button asChild variant="glassIcon" size="icon" className="rounded-full"><Link to="/" aria-label="Back home"><ArrowLeft /></Link></Button>
          <div><h1 className="font-display text-lg font-medium leading-tight">🔥 Desi Prank & Roast Studio</h1><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Just for laughs</p></div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 pt-5">
        <section className="rounded-2xl border border-glass-border bg-glass p-4 shadow-glass backdrop-blur-xl">
          <h2 className="flex items-center gap-2 text-base font-bold">💬 AI Live Chat Box</h2>
          <p className="mt-3 text-xs font-semibold text-muted-foreground">🎙️ कैरेक्टर चुनें</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {characters.map((c) => <Button key={c.id} variant={character === c.id ? "ink" : "glass"} className="h-auto min-h-11 whitespace-normal py-2 text-xs" onClick={() => setCharacter(c.id)}>{c.emoji} {c.name}</Button>)}
          </div>
          <label className="mt-4 block"><span className="text-xs font-semibold text-muted-foreground">✍️ टेक्स्ट टाइप करें</span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={600} rows={3} placeholder="देसी, बिहारी या कोई भी भाषा टाइप करो…" className="mt-2 w-full resize-none rounded-xl border border-input bg-background/70 p-3 text-sm outline-none ring-primary focus:ring-2" />
          </label>
          <Button className="mt-2 w-full" size="lg" disabled={!text.trim()} onClick={() => play("chat", text.trim(), character)}>
            {playing === "chat" ? <><Square /> रोकें</> : <><Play /> तुरंत ओरिजिनल आवाज़ में बोलें</>}
          </Button>
          {error && <p className="mt-2 text-xs font-semibold text-destructive" role="alert">{error}</p>}
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-base font-bold"><Volume2 className="size-5 text-primary" /> Mega Soundboard</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {characters.map((c) => <button key={c.id} onClick={() => setBoard(c.id)} className={cn("rounded-xl border p-3 text-left transition", board === c.id ? "border-primary bg-primary/10" : "border-glass-border bg-glass")}>
              <span className="block text-sm font-bold">{c.emoji} {c.name}</span>
              <span className="block text-[11px] text-muted-foreground">{clipsFor(c.id).length} clips · {c.tag}</span>
            </button>)}
          </div>
          <label className="mt-3 flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clips…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" aria-label="Search clips" />
          </label>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {clips.map((line) => {
              const key = `${board}:${line}`;
              return <li key={key}><button onClick={() => play(key, line, board)} className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition", playing === key ? "border-primary bg-primary/10" : "border-glass-border bg-glass hover:border-primary/50")}>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">{playing === key ? <Square className="size-3.5" /> : <Play className="size-3.5" />}</span>
                <span className="leading-snug">{line}</span>
              </button></li>;
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
