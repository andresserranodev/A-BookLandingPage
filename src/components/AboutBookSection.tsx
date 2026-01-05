import { BookPreviewCarousel } from "./BookPreviewCarousel";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import { JOURNEY_STATS } from "@/lib/constants";
import type { Language } from "@/lib/translations";

interface AboutBookSectionProps {
  lang?: Language;
}

export default function AboutBookSection({ lang }: AboutBookSectionProps) {
  const { t, language } = useLanguage(lang);
  const stats = JOURNEY_STATS[language];

  return (
    <Section id="about" testId="section-about-book" maxWidth="max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading testId="text-about-heading" marginBottom="mb-6">
            {t.aboutBook.heading}
          </SectionHeading>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p data-testid="text-about-paragraph-1">{t.aboutBook.paragraph1}</p>
            <p data-testid="text-about-paragraph-2">{t.aboutBook.paragraph2}</p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4" data-testid="stat-miles">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                {stats.distance}
              </p>
              <p className="text-sm text-muted-foreground">
                {t.aboutBook.statMiles}
              </p>
            </div>
            <div className="p-4" data-testid="stat-countries">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                {JOURNEY_STATS.countries}
              </p>
              <p className="text-sm text-muted-foreground">
                {t.aboutBook.statCountries}
              </p>
            </div>
            <div className="p-4" data-testid="stat-stories">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                1
              </p>
              <p className="text-sm text-muted-foreground">
                {t.aboutBook.statJourney}
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col items-center justify-center lg:order-2">
          <BookPreviewCarousel />
          <p className="mt-6 text-center text-sm font-medium text-muted-foreground">
            {t.aboutBook.available}
          </p>
        </div>
      </div>
    </Section>
  );
}
