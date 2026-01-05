import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import LanguageToggle from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { SITE_CONFIG, NAV_SECTIONS } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { scrollToSection: scrollTo, scrollToTop } = useScrollToSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = useCallback(
    (id: string) => {
      scrollTo(id);
      setIsMobileMenuOpen(false);
    },
    [scrollTo]
  );

  const textStyle = isScrolled
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/80 hover:text-white";

  const logoStyle = isScrolled ? "text-foreground" : "text-white";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className={`font-serif text-lg font-bold transition-colors ${logoStyle}`}
            data-testid="link-logo"
          >
            {SITE_CONFIG.title}
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScrollToSection(section.id)}
                className={`text-sm font-medium transition-colors ${textStyle}`}
                data-testid={`link-nav-${section.id}`}
              >
                {t.nav[section.translationKey]}
              </button>
            ))}
            <LanguageToggle
              className={
                isScrolled
                  ? ""
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }
            />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle
              className={
                isScrolled
                  ? ""
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className={isScrolled ? "" : "text-white"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="border-t border-border bg-background/95 py-4 backdrop-blur-md md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-2">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleScrollToSection(section.id)}
                  className="px-4 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  data-testid={`link-mobile-${section.id}`}
                >
                  {t.nav[section.translationKey]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
