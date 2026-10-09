import { Link } from "@tanstack/react-router";
import { Flame, LibraryBig, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FactoryHeader({ page, theme, onToggleTheme }: { page: "factory" | "vault"; theme: "light" | "dark"; onToggleTheme: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-glass-border bg-glass backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Desi Roast Factory home">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-elevated"><Flame className="size-5 fill-current" /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-extrabold uppercase">Desi Roast Factory</span><span className="block text-[10px] font-bold uppercase text-muted-foreground">Fresh burns. Daily.</span></span>
        </Link>
        <div className="flex items-center gap-1.5">
          <Button asChild variant={page === "factory" ? "ink" : "glass"} size="sm" className="rounded-full">
            <Link to="/"><Flame /> <span className="hidden sm:inline">Roasts</span></Link>
          </Button>
          <Button asChild variant={page === "vault" ? "ink" : "glass"} size="sm" className="rounded-full">
            <Link to="/viral-vault"><LibraryBig /> <span className="hidden sm:inline">Viral Vault</span></Link>
          </Button>
          <Button variant="glassIcon" size="icon" className={cn("rounded-full", theme === "dark" && "text-primary")} aria-label="Toggle color theme" onClick={onToggleTheme}>{theme === "light" ? <Moon /> : <Sun />}</Button>
        </div>
      </div>
    </header>
  );
}