import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/lib/constants";
import type { Language } from "@/lib/translations";

interface OrderSectionProps {
  lang?: Language;
}

export default function OrderSection({ lang }: OrderSectionProps) {
  const { t } = useLanguage(lang);

  return (
    <Section
      id="order"
      testId="section-order"
      maxWidth="max-w-2xl"
      background="bg-card"
      centered
    >
      <SectionHeading testId="text-order-heading" marginBottom="mb-4">
        {t.preorder.heading}
      </SectionHeading>
      <p
        className="mx-auto mb-8 max-w-xl text-base text-muted-foreground md:text-lg"
        data-testid="text-order-description"
      >
        {t.preorder.description}
      </p>

      {/* Standard Flow Buttons */}
      <div className="mx-auto mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          asChild
          className="bg-blue-600 px-6 py-6 text-base font-bold uppercase text-white shadow-md hover:bg-blue-700"
          data-testid="button-submit-order-colombia"
        >
          <a
            href={SITE_CONFIG.preorderFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.preorder.buttonColombia}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="px-6 py-6 text-base font-bold uppercase shadow-sm"
          data-testid="button-submit-order-other"
        >
          <a
            href="https://www.autoreseditores.com/libro/32248/andres-david-serrano-vivas/un-andres-mas.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.preorder.buttonOtherCountries}
          </a>
        </Button>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center gap-3 border-t bg-background/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md sm:flex-row sm:p-4">
        <Button
          asChild
          className="h-auto w-full bg-blue-600 px-6 py-4 text-base font-bold uppercase text-white shadow-md hover:bg-blue-700 sm:w-auto"
        >
          <a
            href={SITE_CONFIG.preorderFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.preorder.buttonColombia}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto w-full px-6 py-4 text-base font-bold uppercase shadow-sm sm:w-auto"
        >
          <a
            href="https://www.autoreseditores.com/libro/32248/andres-david-serrano-vivas/un-andres-mas.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.preorder.buttonOtherCountries}
          </a>
        </Button>
      </div>

      <p
        className="text-sm text-muted-foreground"
        data-testid="text-waitlist-count"
      >
        {t.preorder.waitlistCount}
      </p>
    </Section>
  );
}
