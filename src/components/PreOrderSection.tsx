import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Section, SectionHeading } from "@/components/ui/section";
import { SITE_CONFIG } from "@/lib/constants";

export default function PreOrderSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="preorder"
      testId="section-preorder"
      maxWidth="max-w-2xl"
      centered
    >
      <SectionHeading testId="text-preorder-heading" marginBottom="mb-4">
        {t.preorder.heading}
      </SectionHeading>
      <p
        className="mx-auto mb-8 max-w-xl text-base text-muted-foreground md:text-lg"
        data-testid="text-preorder-description"
      >
        {t.preorder.description}
      </p>

      <div className="mx-auto mb-6 flex justify-center">
        <Button asChild className="px-6" data-testid="button-submit-preorder">
          <a
            href={SITE_CONFIG.preorderFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.preorder.joinButton}
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
