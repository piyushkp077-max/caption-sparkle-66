import { useEffect, useState } from "react";
import wordmark from "@/assets/caption-craze-wordmark.png.asset.json";
import emblem from "@/assets/caption-craze-emblem.png.asset.json";
import { Button } from "@/components/ui/button";
import { SPLASH_DURATION_MS, SPLASH_FADE_MS } from "@/lib/splash-settings";

export function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), SPLASH_DURATION_MS);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fade") return;
    const timer = setTimeout(() => setPhase("done"), SPLASH_FADE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setPhase("fade")}
      className={`splash-screen ${phase === "fade" ? "splash-fade" : ""}`}
      aria-label="Enter Caption Craze"
    >
      <span className="splash-content">
        <img src={wordmark.url} alt="Caption Craze" className="splash-wordmark" />
        <img src={emblem.url} alt="Multicolor KP emblem" className="splash-emblem" />
        <span className="splash-credit">Created by Piyush KP</span>
        <span className="splash-subtext">No Login Needed • 100% Free</span>
      </span>
    </Button>
  );
}

export default SplashScreen;
