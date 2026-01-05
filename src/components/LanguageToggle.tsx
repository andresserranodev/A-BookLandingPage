import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/lib/translations";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  lang?: Language;
}

export default function LanguageToggle({
  className,
  lang,
}: LanguageToggleProps) {
  const { language } = useLanguage(lang);

  // Base path handling for GitHub Pages or root
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
  const targetUrl = language === "es" ? `${base}/en` : `${base}/`;

  return (
    <a
      href={targetUrl}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      data-testid="button-language-toggle"
      aria-label={`Switch to ${language === "en" ? "Spanish" : "English"}`}
    >
      {language === "en" ? "ES" : "EN"}
    </a>
  );
}
