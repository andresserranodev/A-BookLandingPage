import { Button } from "@/components/ui/button";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="border-t border-border bg-card py-12"
      data-testid="section-footer"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="text-center md:text-left">
            <h3
              className="font-serif text-xl font-bold text-foreground"
              data-testid="text-footer-title"
            >
              {SITE_CONFIG.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                aria-label={`Follow on ${link.name}`}
                data-testid={link.testId}
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p
              className="text-sm text-muted-foreground"
              data-testid="text-copyright"
            >
              {t.footer.copyright}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-email"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
