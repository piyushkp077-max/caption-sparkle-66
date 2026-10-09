import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), 2500);
    const t2 = setTimeout(() => setPhase("done"), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[1000000] flex flex-col gap-6 items-center justify-center bg-background text-foreground transition-opacity duration-500 select-none ${phase === "fade" ? "opacity-0" : "opacity-100"}`}
      aria-label="Desi Roast Factory — Created by Piyush KP"
      role="img"
    >
      <span className="grid size-24 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elevated"><Flame className="size-12 fill-current" /></span>
      <span className="font-body text-2xl font-bold">Desi Roast Factory</span>
      <span className="text-sm text-muted-foreground">Created by Piyush KP</span>
    </div>
  );
}

export default SplashScreen;
