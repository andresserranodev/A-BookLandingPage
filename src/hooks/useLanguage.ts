import { type Language } from "@/lib/translations";
import { useTranslations } from "@/lib/useTranslations";

declare global {
  interface Window {
    __ASTRO_LANG__: Language;
  }
}

export function useLanguage() {
  const language = (
    typeof window !== "undefined" ? window.__ASTRO_LANG__ : "en"
  ) as Language;
  const t = useTranslations(language);

  return { language, t };
}
