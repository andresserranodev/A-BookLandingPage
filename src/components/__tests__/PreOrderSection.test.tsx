import { render, screen } from "@testing-library/react";
import PreOrderSection from "../PreOrderSection";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/lib/constants";

// Mock the useLanguage hook
jest.mock("@/hooks/useLanguage", () => ({
  useLanguage: jest.fn(() => ({
    language: "es",
    t: {
      preorder: {
        heading: "Únete a la lista de espera",
        description:
          "Regístrate para recibir actualizaciones exclusivas y ser de los primeros en obtener tu copia cuando esté disponible.",
        joinButton: "Unirme a la lista",
        waitlistCount: "Más de 100 personas ya están esperando",
      },
    },
  })),
}));

describe("PreOrderSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section with correct structure", () => {
    render(<PreOrderSection />);

    expect(screen.getByTestId("section-preorder")).toBeInTheDocument();
  });

  it("renders the heading with correct text", () => {
    render(<PreOrderSection />);

    const heading = screen.getByTestId("text-preorder-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Únete a la lista de espera");
  });

  it("renders the description with correct text", () => {
    render(<PreOrderSection />);

    const description = screen.getByTestId("text-preorder-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Regístrate para recibir actualizaciones exclusivas y ser de los primeros en obtener tu copia cuando esté disponible."
    );
  });

  it("renders the waitlist count with correct text", () => {
    render(<PreOrderSection />);

    const waitlistCount = screen.getByTestId("text-waitlist-count");
    expect(waitlistCount).toBeInTheDocument();
    expect(waitlistCount).toHaveTextContent(
      "Más de 100 personas ya están esperando"
    );
  });

  it("renders the join button with correct text", () => {
    render(<PreOrderSection />);

    const button = screen.getByTestId("button-submit-preorder");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Unirme a la lista");
  });

  it("button links to the correct preorder form URL", () => {
    render(<PreOrderSection />);

    const link = screen.getByRole("link", { name: "Unirme a la lista" });
    expect(link).toHaveAttribute("href", SITE_CONFIG.preorderFormUrl);
  });

  it("button link opens in new tab with security attributes", () => {
    render(<PreOrderSection />);

    const link = screen.getByRole("link", { name: "Unirme a la lista" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses the language prop when provided", () => {
    render(<PreOrderSection lang="en" />);

    expect(useLanguage).toHaveBeenCalledWith("en");
  });

  it("calls useLanguage without arguments when lang prop is not provided", () => {
    render(<PreOrderSection />);

    expect(useLanguage).toHaveBeenCalledWith(undefined);
  });

  it("section has correct id attribute", () => {
    render(<PreOrderSection />);

    const section = screen.getByTestId("section-preorder");
    expect(section).toHaveAttribute("id", "preorder");
  });

  it("description has correct styling classes", () => {
    render(<PreOrderSection />);

    const description = screen.getByTestId("text-preorder-description");
    expect(description.className).toContain("text-muted-foreground");
    expect(description.className).toContain("max-w-xl");
  });

  it("waitlist count has correct styling classes", () => {
    render(<PreOrderSection />);

    const waitlistCount = screen.getByTestId("text-waitlist-count");
    expect(waitlistCount.className).toContain("text-sm");
    expect(waitlistCount.className).toContain("text-muted-foreground");
  });
});
