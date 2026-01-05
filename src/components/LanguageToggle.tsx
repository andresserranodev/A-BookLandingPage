import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { language } = useLanguage();
  
  // Base path handling for GitHub Pages or root
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
  const targetUrl = language === "en" ? `${base}/es` : `${base}/`;

  return (
    <a
      href={targetUrl}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3",
        className
      )}
      data-testid="button-language-toggle"
      aria-label={`Switch to ${language === "en" ? "Spanish" : "English"}`}
    >
      {language === "en" ? "ES" : "EN"}
    </a>
  );
}
