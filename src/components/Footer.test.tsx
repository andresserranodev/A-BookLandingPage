import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { translations } from "@/lib/translations";

// Mock the useLanguage hook
jest.mock("@/hooks/useLanguage");

describe("Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders footer with correct structure", () => {
    render(<Footer />);

    expect(screen.getByTestId("section-footer")).toBeInTheDocument();
  });

  it("renders site title", () => {
    render(<Footer />);

    expect(screen.getByTestId("text-footer-title")).toHaveTextContent(
      SITE_CONFIG.title
    );
  });

  it("renders tagline from translations (Spanish by default)", () => {
    render(<Footer />);

    expect(
      screen.getByText(translations.es.footer.tagline)
    ).toBeInTheDocument();
  });

  it("renders copyright text from translations (Spanish by default)", () => {
    render(<Footer />);

    expect(screen.getByTestId("text-copyright")).toHaveTextContent(
      translations.es.footer.copyright
    );
  });

  it("renders email link with correct attributes", () => {
    render(<Footer />);

    const emailLink = screen.getByTestId("link-email");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveTextContent(SITE_CONFIG.email);
    expect(emailLink).toHaveAttribute("href", `mailto:${SITE_CONFIG.email}`);
  });

  it("has correct layout structure", () => {
    render(<Footer />);

    const footer = screen.getByTestId("section-footer");
    expect(footer.tagName).toBe("FOOTER");
    expect(footer.className).toContain("border-t");
    expect(footer.className).toContain("bg-card");
  });

  it("email link has correct styling classes", () => {
    render(<Footer />);

    const emailLink = screen.getByTestId("link-email");
    expect(emailLink.className).toContain("text-sm");
    expect(emailLink.className).toContain("text-muted-foreground");
    expect(emailLink.className).toContain("hover:text-foreground");
  });
});
