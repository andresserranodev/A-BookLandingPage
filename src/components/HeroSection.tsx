import heroDesktop from "@/assets/hero_cotopaxi_desktop.webp";
import heroMobile from "@/assets/hero_cotopaxi_mobile.webp";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={heroDesktop.src} />
        <img
          src={heroMobile.src}
          alt="Andrés en su moto frente al volcán Cotopaxi durante su viaje desde Colombia hasta la Patagonia - Libro Un Andrés Más"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1
          className="mb-4 font-serif text-5xl font-black tracking-tight text-white sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl"
          data-testid="text-book-title"
        >
          {t.hero.title}
        </h1>
        <p
          className="mx-auto mb-8 max-w-2xl text-lg font-medium text-white/90 sm:mb-10 sm:text-xl md:text-2xl"
          data-testid="text-book-subtitle"
        >
          {t.hero.subtitle}
        </p>
        <Button
          size="lg"
          asChild
          className="border border-primary-border bg-primary/90 px-8 py-4 text-lg font-semibold backdrop-blur-md"
          data-testid="button-hero-preorder"
        >
          <a
            href={SITE_CONFIG.preorderFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hero.preorderButton}
          </a>
        </Button>
      </div>
    </section>
  );
}
