import { renderHook } from "@testing-library/react";
import { useLanguage } from "../useLanguage";
import { translations } from "@/lib/translations";

type WindowWithLang = Window & { __ASTRO_LANG__?: "en" | "es" };

describe("useLanguage", () => {
  beforeEach(() => {
    // Reset window.__ASTRO_LANG__ before each test
    if (typeof window !== "undefined") {
      delete (window as Partial<WindowWithLang>).__ASTRO_LANG__;
    }
  });

  afterEach(() => {
    // Cleanup
    if (typeof window !== "undefined") {
      delete (window as Partial<WindowWithLang>).__ASTRO_LANG__;
    }
  });

  it("returns provided language when lang prop is passed", () => {
    const { result } = renderHook(() => useLanguage("en"));
    expect(result.current.language).toBe("en");
  });

  it("returns Spanish translations when lang is es", () => {
    const { result } = renderHook(() => useLanguage("es"));
    expect(result.current.language).toBe("es");
    expect(result.current.t).toBe(translations.es);
  });

  it("returns English translations when lang is en", () => {
    const { result } = renderHook(() => useLanguage("en"));
    expect(result.current.language).toBe("en");
    expect(result.current.t).toBe(translations.en);
  });

  it("reads language from window.__ASTRO_LANG__ when no prop provided", () => {
    (window as Window & { __ASTRO_LANG__?: "en" | "es" }).__ASTRO_LANG__ = "en";
    const { result } = renderHook(() => useLanguage());
    expect(result.current.language).toBe("en");
  });

  it("defaults to Spanish when no prop and no window value", () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.language).toBe("es");
  });

  it("returns correct translations object structure", () => {
    const { result } = renderHook(() => useLanguage("en"));
    expect(result.current.t).toHaveProperty("nav");
    expect(result.current.t).toHaveProperty("hero");
    expect(result.current.t).toHaveProperty("aboutBook");
    expect(result.current.t).toHaveProperty("aboutAuthor");
    expect(result.current.t).toHaveProperty("preorder");
    expect(result.current.t).toHaveProperty("footer");
  });

  it("prioritizes prop over window value", () => {
    (window as Window & { __ASTRO_LANG__?: "en" | "es" }).__ASTRO_LANG__ = "en";
    const { result } = renderHook(() => useLanguage("es"));
    expect(result.current.language).toBe("es");
  });
});
