import { useMemo } from "react";
import { type Language } from "@/lib/translations";
import { useTranslations } from "@/lib/useTranslations";

declare global {
  interface Window {
    __ASTRO_LANG__: Language;
  }
}

export function useLanguage(lang?: Language) {
  // Use prop if provided, otherwise read from window (client-side only)
  const language = useMemo(() => {
    if (lang) return lang;
    if (typeof window !== "undefined" && window.__ASTRO_LANG__) {
      return window.__ASTRO_LANG__;
    }
    return "es" as Language; // Default to Spanish
  }, [lang]);

  const t = useTranslations(language);

  return { language, t };
}
