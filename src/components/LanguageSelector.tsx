import { Button } from "@/components/ui/button";
import { captionLanguages, type CaptionLanguage } from "@/lib/caption-settings";

export function LanguageSelector({ value, onChange }: { value: CaptionLanguage; onChange: (value: CaptionLanguage) => void }) {
  return <div role="group" aria-label="Caption tone" className="mt-2 grid grid-cols-2 gap-2">
    {captionLanguages.map((language) => <Button key={language} aria-pressed={value === language} variant={value === language ? "ink" : "outline"} className="h-10 min-w-0 rounded-lg px-2 font-hindi text-sm" onClick={() => onChange(language)}>{language}</Button>)}
  </div>;
}