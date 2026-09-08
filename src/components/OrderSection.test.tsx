import { render, screen } from "@testing-library/react";
import OrderSection from "./OrderSection";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/lib/constants";
import { translations } from "@/lib/translations";

// Mock the useLanguage hook
jest.mock("@/hooks/useLanguage");

describe("OrderSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section with correct structure", () => {
    render(<OrderSection />);

    expect(screen.getByTestId("section-order")).toBeInTheDocument();
  });

  it("renders the heading with correct text", () => {
    render(<OrderSection />);

    const heading = screen.getByTestId("text-order-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(translations.es.preorder.heading);
  });

  it("renders the description with correct text", () => {
    render(<OrderSection />);

    const description = screen.getByTestId("text-order-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(translations.es.preorder.description);
  });

  it("renders the waitlist count with correct text", () => {
    render(<OrderSection />);

    const waitlistCount = screen.getByTestId("text-waitlist-count");
    expect(waitlistCount).toBeInTheDocument();
    expect(waitlistCount).toHaveTextContent(
      translations.es.preorder.waitlistCount
    );
  });

  it("renders the buttons with correct text", () => {
    render(<OrderSection />);

    const buttonColombia = screen.getByTestId("button-submit-order-colombia");
    expect(buttonColombia).toBeInTheDocument();
    expect(buttonColombia).toHaveTextContent(
      translations.es.preorder.buttonColombia
    );

    const buttonOther = screen.getByTestId("button-submit-order-other");
    expect(buttonOther).toBeInTheDocument();
    expect(buttonOther).toHaveTextContent(
      translations.es.preorder.buttonOtherCountries
    );
  });

  it("buttons link to the correct URLs", () => {
    render(<OrderSection />);

    const linkColombia = screen.getAllByRole("link", {
      name: translations.es.preorder.buttonColombia,
    })[0];
    expect(linkColombia).toHaveAttribute("href", SITE_CONFIG.preorderFormUrl);

    const linkOther = screen.getAllByRole("link", {
      name: translations.es.preorder.buttonOtherCountries,
    })[0];
    expect(linkOther).toHaveAttribute(
      "href",
      "https://www.autoreseditores.com/libro/32248/andres-david-serrano-vivas/un-andres-mas.html"
    );
  });

  it("button links open in new tab with security attributes", () => {
    render(<OrderSection />);

    const links = [
      ...screen.getAllByRole("link", {
        name: translations.es.preorder.buttonColombia,
      }),
      ...screen.getAllByRole("link", {
        name: translations.es.preorder.buttonOtherCountries,
      }),
    ];

    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("uses the language prop when provided", () => {
    render(<OrderSection lang="en" />);

    expect(useLanguage).toHaveBeenCalledWith("en");
  });

  it("calls useLanguage without arguments when lang prop is not provided", () => {
    render(<OrderSection />);

    expect(useLanguage).toHaveBeenCalledWith(undefined);
  });

  it("section has correct id attribute", () => {
    render(<OrderSection />);

    const section = screen.getByTestId("section-order");
    expect(section).toHaveAttribute("id", "order");
  });

  it("description has correct styling classes", () => {
    render(<OrderSection />);

    const description = screen.getByTestId("text-order-description");
    expect(description.className).toContain("text-muted-foreground");
    expect(description.className).toContain("max-w-xl");
  });

  it("waitlist count has correct styling classes", () => {
    render(<OrderSection />);

    const waitlistCount = screen.getByTestId("text-waitlist-count");
    expect(waitlistCount.className).toContain("text-sm");
    expect(waitlistCount.className).toContain("text-muted-foreground");
  });
});
