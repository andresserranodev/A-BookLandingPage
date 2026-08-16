import { translations } from "../translations";
import { useTranslations } from "../useTranslations";

describe("useTranslations", () => {
  it("returns English translations when lang is 'en'", () => {
    const result = useTranslations("en");
    expect(result).toBe(translations.en);
  });

  it("returns Spanish translations when lang is 'es'", () => {
    const result = useTranslations("es");
    expect(result).toBe(translations.es);
  });

  it("returns correct nav translations for English", () => {
    const result = useTranslations("en");
    expect(result.nav.aboutBook).toBe("About the Book");
    expect(result.nav.author).toBe("Author");
    expect(result.nav.preorder).toBe("Buy the Book");
  });

  it("returns correct nav translations for Spanish", () => {
    const result = useTranslations("es");
    expect(result.nav.aboutBook).toBe("Sobre el Libro");
    expect(result.nav.author).toBe("Autor");
    expect(result.nav.preorder).toBe("Comprar el Libro");
  });

  it("returns correct hero section translations for English", () => {
    const result = useTranslations("en");
    expect(result.hero.title).toBe("Un Andrés Más");
    expect(result.hero.subtitle).toBe(
      "A Motorcycle Journey from Colombia to Patagonia"
    );
  });

  it("returns correct hero section translations for Spanish", () => {
    const result = useTranslations("es");
    expect(result.hero.title).toBe("Un Andrés Más");
    expect(result.hero.subtitle).toBe(
      "Un Viaje en Moto desde Colombia hasta la Patagonia"
    );
  });
});
