import { render, screen, renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

describe("LanguageContext", () => {
  describe("LanguageProvider", () => {
    it("provides default language as 'en'", () => {
      const TestComponent = () => {
        const { language } = useLanguage();
        return <div data-testid="language">{language}</div>;
      };

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("language")).toHaveTextContent("en");
    });

    it("accepts custom initial language", () => {
      const TestComponent = () => {
        const { language } = useLanguage();
        return <div data-testid="language">{language}</div>;
      };

      render(
        <LanguageProvider initialLanguage="es">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("language")).toHaveTextContent("es");
    });

    it("provides translations for current language", () => {
      const TestComponent = () => {
        const { t } = useLanguage();
        return <div data-testid="nav-about">{t.nav.aboutBook}</div>;
      };

      render(
        <LanguageProvider initialLanguage="en">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("nav-about")).toHaveTextContent(
        translations.en.nav.aboutBook
      );
    });

    it("provides Spanish translations when initialized with 'es'", () => {
      const TestComponent = () => {
        const { t } = useLanguage();
        return <div data-testid="nav-about">{t.nav.aboutBook}</div>;
      };

      render(
        <LanguageProvider initialLanguage="es">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("nav-about")).toHaveTextContent(
        translations.es.nav.aboutBook
      );
    });

    it("allows language switching", () => {
      const TestComponent = () => {
        const { language, setLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="language">{language}</div>
            <button
              onClick={() => setLanguage("es")}
              data-testid="switch-to-es"
            >
              Switch to Spanish
            </button>
          </div>
        );
      };

      render(
        <LanguageProvider initialLanguage="en">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("language")).toHaveTextContent("en");

      act(() => {
        screen.getByTestId("switch-to-es").click();
      });

      expect(screen.getByTestId("language")).toHaveTextContent("es");
    });

    it("updates translations when language changes", () => {
      const TestComponent = () => {
        const { t, setLanguage } = useLanguage();
        return (
          <div>
            <div data-testid="nav-about">{t.nav.aboutBook}</div>
            <button
              onClick={() => setLanguage("es")}
              data-testid="switch-to-es"
            >
              Switch
            </button>
          </div>
        );
      };

      render(
        <LanguageProvider initialLanguage="en">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("nav-about")).toHaveTextContent(
        translations.en.nav.aboutBook
      );

      act(() => {
        screen.getByTestId("switch-to-es").click();
      });

      expect(screen.getByTestId("nav-about")).toHaveTextContent(
        translations.es.nav.aboutBook
      );
    });

    it("can switch from Spanish to English", () => {
      const TestComponent = () => {
        const { language, setLanguage, t } = useLanguage();
        return (
          <div>
            <div data-testid="language">{language}</div>
            <div data-testid="hero-title">{t.hero.title}</div>
            <button
              onClick={() => setLanguage("en")}
              data-testid="switch-to-en"
            >
              Switch to English
            </button>
          </div>
        );
      };

      render(
        <LanguageProvider initialLanguage="es">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId("language")).toHaveTextContent("es");
      expect(screen.getByTestId("hero-title")).toHaveTextContent(
        translations.es.hero.title
      );

      act(() => {
        screen.getByTestId("switch-to-en").click();
      });

      expect(screen.getByTestId("language")).toHaveTextContent("en");
      expect(screen.getByTestId("hero-title")).toHaveTextContent(
        translations.en.hero.title
      );
    });

    it("renders children components", () => {
      render(
        <LanguageProvider>
          <div data-testid="child">Child Component</div>
        </LanguageProvider>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });
  });

  describe("useLanguage hook", () => {
    it("throws error when used outside LanguageProvider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const TestComponent = () => {
        useLanguage();
        return <div>Test</div>;
      };

      expect(() => render(<TestComponent />)).toThrow(
        "useLanguage must be used within a LanguageProvider"
      );

      consoleSpy.mockRestore();
    });

    it("returns language context when used within provider", () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
      );

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.language).toBe("en");
      expect(result.current.t).toBeDefined();
      expect(result.current.setLanguage).toBeDefined();
    });

    it("provides setLanguage function that updates language", () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
      );

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.language).toBe("en");

      act(() => {
        result.current.setLanguage("es");
      });

      expect(result.current.language).toBe("es");
    });

    it("provides all translation keys", () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
      );

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.t.nav).toBeDefined();
      expect(result.current.t.hero).toBeDefined();
      expect(result.current.t.aboutBook).toBeDefined();
      expect(result.current.t.aboutAuthor).toBeDefined();
      expect(result.current.t.preorder).toBeDefined();
      expect(result.current.t.footer).toBeDefined();
    });

    it("updates translations when language is switched", () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
      );

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.t.nav.aboutBook).toBe(
        translations.en.nav.aboutBook
      );

      act(() => {
        result.current.setLanguage("es");
      });

      expect(result.current.t.nav.aboutBook).toBe(
        translations.es.nav.aboutBook
      );
    });
  });
});
