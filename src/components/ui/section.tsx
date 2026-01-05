import { cn } from "@/lib/utils";

type MaxWidth = "max-w-2xl" | "max-w-3xl" | "max-w-6xl";
type Background = "bg-background" | "bg-card";
type MarginBottom = "mb-4" | "mb-6" | "mb-8";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  testId: string;
  maxWidth?: MaxWidth;
  background?: Background;
  centered?: boolean;
  className?: string;
}

export function Section({
  id,
  children,
  testId,
  maxWidth = "max-w-6xl",
  background = "bg-background",
  centered = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(background, "py-16 md:py-24 lg:py-32")}
      data-testid={testId}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          maxWidth,
          centered && "text-center",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  testId: string;
  marginBottom?: MarginBottom;
  className?: string;
}

export function SectionHeading({
  children,
  testId,
  marginBottom = "mb-6",
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold text-foreground sm:text-4xl md:text-5xl",
        marginBottom,
        className
      )}
      data-testid={testId}
    >
      {children}
    </h2>
  );
}
