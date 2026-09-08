import { translations, type Language } from "@/lib/translations";

// Default mock implementation
const mockUseLanguage = jest.fn((lang?: Language) => {
  const selectedLang = lang || "es";
  return {
    language: selectedLang,
    t: translations[selectedLang],
  };
});

export const useLanguage = mockUseLanguage;
