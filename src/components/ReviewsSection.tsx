import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/lib/translations";

interface ReviewsSectionProps {
  lang?: Language;
}

function ReviewCard({
  name,
  texts,
  seeMoreText,
  seeLessText,
}: {
  name: string;
  texts: string[];
  seeMoreText: string;
  seeLessText: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Determine if it should be collapsible. A rough estimate for 5 lines is ~250 chars.
  const isCollapsible =
    texts.reduce((acc, text) => acc + text.length, 0) > 250 || texts.length > 2;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div
          ref={contentRef}
          className={`space-y-3 text-muted-foreground ${
            !isExpanded && isCollapsible ? "line-clamp-5 overflow-hidden" : ""
          }`}
          style={
            !isExpanded && isCollapsible
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }
              : {}
          }
        >
          {texts.map((text, index) => (
            <p key={index} className="text-base">
              {text}
            </p>
          ))}
        </div>
        {isCollapsible && (
          <Button
            variant="link"
            className="mt-2 h-auto p-0 font-semibold text-blue-600"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? seeLessText : seeMoreText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function ReviewsSection({ lang = "es" }: ReviewsSectionProps) {
  const { t } = useLanguage(lang);

  const reviews = t.reviews || {
    heading: "Lo que dicen los lectores",
    seeMore: "Ver más",
    seeLess: "Ver menos",
    humberto: [],
    alejandro: [],
    norileoluegoexisto: [],
  };

  return (
    <Section id="reviews" testId="section-reviews" background="bg-card">
      <SectionHeading testId="text-reviews-heading" className="text-center">
        {reviews.heading}
      </SectionHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ReviewCard
          name="Humberto"
          texts={reviews.humberto}
          seeMoreText={reviews.seeMore}
          seeLessText={reviews.seeLess}
        />
        <ReviewCard
          name="Alejandro"
          texts={reviews.alejandro}
          seeMoreText={reviews.seeMore}
          seeLessText={reviews.seeLess}
        />
        <ReviewCard
          name="norileoluegoexisto (tiempo_de_leer)"
          texts={reviews.norileoluegoexisto}
          seeMoreText={reviews.seeMore}
          seeLessText={reviews.seeLess}
        />
      </div>
    </Section>
  );
}
