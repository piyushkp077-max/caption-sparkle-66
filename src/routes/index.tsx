import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Flame, Heart, Search, Share2, Sparkles, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FactoryHeader } from "@/components/FactoryHeader";
import { roastCategories, roastPosts, type RoastPost } from "@/lib/roast-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Desi Roast Factory — Savage Hindi & Hinglish Roasts" },
    { name: "description", content: "Discover, copy, save and share fresh desi roasts for friends, family, dating and office banter." },
    { property: "og:title", content: "Desi Roast Factory" },
    { property: "og:description", content: "Fresh Hindi and Hinglish burns, ready to copy and share." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: RoastFactory,
});

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => { const saved = window.localStorage.getItem("factory-theme"); if (saved === "dark") setTheme("dark"); }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); window.localStorage.setItem("factory-theme", theme); }, [theme]);
  return [theme, setTheme] as const;
}

function RoastFactory() {
  const [theme, setTheme] = useTheme();
  const [category, setCategory] = useState<(typeof roastCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { try { setSaved(JSON.parse(window.localStorage.getItem("saved-roasts") ?? "[]")); } catch { setSaved([]); } }, []);
  const notify = (text: string) => { setToast(text); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setToast(""), 1800); };
  const toggleSaved = (id: number) => setSaved((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; window.localStorage.setItem("saved-roasts", JSON.stringify(next)); notify(next.includes(id) ? "Saved to your collection" : "Removed from saved"); return next; });
  const copy = async (text: string) => { await navigator.clipboard.writeText(text); notify("Roast copied"); };
  const share = async (post: RoastPost) => { if (navigator.share) { try { await navigator.share({ title: "Desi Roast Factory", text: post.text }); } catch { return; } } else { await copy(post.text); } };
  const filtered = useMemo(() => roastPosts.filter((post) => (category === "All" || post.category === category) && (!savedOnly || saved.includes(post.id)) && `${post.text} ${post.translation} ${post.category}`.toLowerCase().includes(query.trim().toLowerCase())), [category, query, saved, savedOnly]);

  return <div className="ambient-page min-h-screen bg-background text-foreground">
    <FactoryHeader page="factory" theme={theme} onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <section className="grid min-h-[340px] content-center border-b border-border py-12 md:grid-cols-[1.3fr_.7fr] md:items-end md:gap-10">
        <div><p className="flex items-center gap-2 text-xs font-extrabold uppercase text-primary"><Zap className="size-4 fill-current" /> Internet ka roast department</p><h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[.95] sm:text-6xl md:text-7xl">Scroll less.<br />Burn better.</h1><p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Fresh desi comebacks for the group chat, office drama and every friend who asked for it.</p></div>
        <div className="mt-8 grid grid-cols-2 border-y border-border py-5 md:mt-0"><div><strong className="font-display text-3xl">12</strong><span className="block text-[10px] font-bold uppercase text-muted-foreground">Fresh roasts</span></div><div className="border-l border-border pl-5"><strong className="font-display text-3xl">5</strong><span className="block text-[10px] font-bold uppercase text-muted-foreground">Burn zones</span></div></div>
      </section>

      <section className="sticky top-[65px] z-30 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 py-2.5"><Search className="size-4 text-muted-foreground" /><input className="min-w-0 flex-1 bg-transparent text-sm outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the perfect burn…" aria-label="Search roasts" /></label>
          <Button variant={savedOnly ? "ink" : "outline"} className="rounded-lg" onClick={() => setSavedOnly(!savedOnly)}><Heart className={cn(savedOnly && "fill-current")} /> Saved {saved.length > 0 && `(${saved.length})`}</Button>
        </div>
        <div className="no-scrollbar mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto">{roastCategories.map((item) => <Button key={item} variant={category === item ? "ink" : "glass"} size="pill" onClick={() => setCategory(item)}>{item}</Button>)}</div>
      </section>

      <section className="py-8"><div className="flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase text-primary">{savedOnly ? "Your collection" : "Fresh off the tandoor"}</p><h2 className="mt-1 font-display text-3xl font-semibold">{category === "All" ? "Trending burns" : `${category} roasts`}</h2></div><span className="text-xs font-bold text-muted-foreground">{filtered.length} posts</span></div>
        {filtered.length ? <div className="mt-6 grid gap-6 md:grid-cols-2">{filtered.map((post) => <RoastCard key={post.id} post={post} saved={saved.includes(post.id)} onSave={() => toggleSaved(post.id)} onCopy={() => copy(post.text)} onShare={() => share(post)} />)}</div> : <div className="py-24 text-center"><Sparkles className="mx-auto size-8 text-primary" /><h2 className="mt-3 font-display text-2xl">No burns found</h2><p className="mt-1 text-sm text-muted-foreground">Try another category or keyword.</p></div>}
      </section>
    </main>
    {toast && <div role="status" className="toast-in fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-background shadow-elevated"><Check className="size-4" />{toast}</div>}
  </div>;
}

function RoastCard({ post, saved, onSave, onCopy, onShare }: { post: RoastPost; saved: boolean; onSave: () => void; onCopy: () => void; onShare: () => void }) {
  return <article className="rise overflow-hidden rounded-lg border border-border bg-card shadow-glass">
    <div className={cn("flex min-h-64 flex-col justify-between p-6 text-story-foreground", post.gradient)}><div className="flex items-center justify-between text-[10px] font-extrabold uppercase"><span className="rounded-full bg-story-soft px-2.5 py-1">{post.heat}</span><span>{post.shares} shares</span></div><div><p className="font-hindi text-2xl font-semibold leading-snug sm:text-3xl">“{post.text}”</p><p className="mt-3 text-sm opacity-80">{post.translation}</p></div><span className="mt-6 text-[10px] font-bold uppercase opacity-70">#{post.category}</span></div>
    <div className="grid grid-cols-[1fr_1fr_auto] gap-2 p-3"><Button variant="outline" onClick={onCopy}><Copy /> Copy</Button><Button variant="ink" onClick={onShare}><Share2 /> Share</Button><Button variant="ghost" size="icon" aria-label={saved ? "Remove saved roast" : "Save roast"} onClick={onSave}><Heart className={cn(saved && "fill-primary text-primary")} /></Button></div>
  </article>;
}