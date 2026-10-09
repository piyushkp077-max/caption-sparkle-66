import { createFileRoute } from "@tanstack/react-router";
import { Check, Download, Heart, Play, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FactoryHeader } from "@/components/FactoryHeader";
import cricketPoster from "@/assets/vault-cricket.jpg";
import reactionPoster from "@/assets/vault-reaction.jpg";
import weddingPoster from "@/assets/vault-wedding.jpg";
import { vaultCategories, vaultClips, type VaultClip } from "@/lib/vault-content";
import { cn } from "@/lib/utils";

const posters: Record<string, string> = { "chai-shock": reactionPoster, "shaadi-entry": weddingPoster, "match-point": cricketPoster };

export const Route = createFileRoute("/viral-vault")({
  head: () => ({ meta: [
    { title: "Viral Vault — Download Desi Video Clips" },
    { name: "description", content: "Preview and download organized vertical desi reaction, wedding and cricket clips." },
    { property: "og:title", content: "Viral Vault — Desi Clip Library" },
    { property: "og:description", content: "A curated library of ready-to-download vertical desi clips." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ViralVault,
});

function ViralVault() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [category, setCategory] = useState<(typeof vaultCategories)[number]>("All Clips");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"popular" | "newest">("popular");
  const [saved, setSaved] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [preview, setPreview] = useState<VaultClip | null>(null);
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { const savedTheme = window.localStorage.getItem("factory-theme"); if (savedTheme === "dark") setTheme("dark"); try { setSaved(JSON.parse(window.localStorage.getItem("saved-clips") ?? "[]")); } catch { setSaved([]); } }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); window.localStorage.setItem("factory-theme", theme); }, [theme]);
  const notify = (text: string) => { setToast(text); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setToast(""), 1800); };
  const toggleSaved = (id: string) => setSaved((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; window.localStorage.setItem("saved-clips", JSON.stringify(next)); return next; });
  const visible = useMemo(() => vaultClips.filter((clip) => (category === "All Clips" || clip.category === category) && (!savedOnly || saved.includes(clip.id)) && `${clip.title} ${clip.category}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "popular" ? b.downloads - a.downloads : b.id.localeCompare(a.id)), [category, query, saved, savedOnly, sort]);

  return <div className="min-h-screen bg-background text-foreground"><FactoryHeader page="vault" theme={theme} onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
    <main className="mx-auto max-w-6xl px-4 pb-20">
      <section className="border-b border-border py-12 sm:py-16"><p className="text-xs font-extrabold uppercase text-primary">Curated for creators</p><div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h1 className="font-display text-5xl font-semibold sm:text-7xl">The Viral Vault</h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Vertical desi moments, neatly sorted and ready to drop into your next edit.</p></div><div className="flex gap-6 border-y border-border py-4"><div><strong className="font-display text-3xl">03</strong><span className="block text-[10px] font-bold uppercase text-muted-foreground">Clips</span></div><div><strong className="font-display text-3xl">HD</strong><span className="block text-[10px] font-bold uppercase text-muted-foreground">Quality</span></div></div></div></section>
      <section className="py-5"><div className="grid gap-3 md:grid-cols-[1fr_auto_auto]"><label className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2.5"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Search clips…" aria-label="Search clips" /></label><Button variant={savedOnly ? "ink" : "outline"} onClick={() => setSavedOnly(!savedOnly)}><Heart className={cn(savedOnly && "fill-current")} /> Saved</Button><label className="flex items-center gap-2 rounded-md border border-input bg-background px-3 text-sm"><SlidersHorizontal className="size-4" /><select className="h-10 bg-transparent outline-none" value={sort} onChange={(event) => setSort(event.target.value as "popular" | "newest")} aria-label="Sort clips"><option value="popular">Most downloaded</option><option value="newest">Newest first</option></select></label></div><div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">{vaultCategories.map((item) => <Button key={item} size="pill" variant={category === item ? "ink" : "glass"} onClick={() => setCategory(item)}>{item}</Button>)}</div></section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((clip) => <ClipCard key={clip.id} clip={clip} poster={posters[clip.id] ?? reactionPoster} saved={saved.includes(clip.id)} onSave={() => toggleSaved(clip.id)} onPreview={() => setPreview(clip)} onDownload={() => notify("Download started")} />)}</section>
      {!visible.length && <div className="py-24 text-center"><Search className="mx-auto size-8 text-primary" /><h2 className="mt-3 font-display text-2xl">No clips found</h2><p className="mt-1 text-sm text-muted-foreground">Try another filter or search.</p></div>}
    </main>
    {preview && <div className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label={`${preview.title} preview`}><div className="w-full max-w-sm"><div className="mb-3 flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-primary">Preview</p><h2 className="font-display text-xl">{preview.title}</h2></div><Button variant="glassIcon" size="icon" aria-label="Close preview" onClick={() => setPreview(null)}><X /></Button></div><video key={preview.file} src={preview.file} poster={posters[preview.id]} className="aspect-[9/16] w-full rounded-lg bg-card object-cover shadow-elevated" controls autoPlay muted playsInline /><Button asChild variant="ink" size="lg" className="mt-3 w-full"><a href={preview.file} download={`${preview.id}.mp4`} onClick={() => notify("Download started")}><Download /> Download MP4</a></Button></div></div>}
    {toast && <div role="status" className="toast-in fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-background shadow-elevated"><Check className="size-4" />{toast}</div>}
  </div>;
}

function ClipCard({ clip, poster, saved, onSave, onPreview, onDownload }: { clip: VaultClip; poster: string; saved: boolean; onSave: () => void; onPreview: () => void; onDownload: () => void }) {
  return <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-glass"><div className="relative aspect-[9/12] overflow-hidden"><img src={poster} alt={`${clip.title} clip preview`} width={768} height={1376} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-extrabold uppercase backdrop-blur">{clip.category}</span><Button variant="ink" size="icon" className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full" aria-label={`Preview ${clip.title}`} onClick={onPreview}><Play className="fill-current" /></Button><Button variant="glassIcon" size="icon" className="absolute right-3 top-3 rounded-full" aria-label={saved ? "Remove saved clip" : "Save clip"} onClick={onSave}><Heart className={cn(saved && "fill-primary text-primary")} /></Button></div><div className="p-4"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-xl font-semibold">{clip.title}</h2><p className="mt-1 text-xs text-muted-foreground">{clip.duration} · {clip.format} · {clip.quality}</p></div><span className="text-right text-[10px] font-bold uppercase text-muted-foreground">{(clip.downloads / 1000).toFixed(1)}K<br />downloads</span></div><Button asChild variant="ink" className="mt-4 w-full"><a href={clip.file} download={`${clip.id}.mp4`} onClick={onDownload}><Download /> Download MP4</a></Button></div></article>;
}