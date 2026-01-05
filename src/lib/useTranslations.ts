import { translations, type Language } from "./translations";

export function useTranslations(lang: Language) {
  return translations[lang];
}
