import { render, screen } from "@testing-library/react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { getBaseUrl } from "@/lib/env";

// Mock the hooks and env
jest.mock("@/hooks/useLanguage");
jest.mock("@/lib/env", () => ({
  getBaseUrl: jest.fn(() => "/"),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Given Spanish language, when component renders, then it should display 'EN' and link to English version", () => {
    // Arrange
    (useLanguage as jest.Mock).mockReturnValue({
      language: "es",
    });

    // Act
    render(<LanguageToggle />);

    // Assert
    const toggle = screen.getByTestId("button-language-toggle");
    expect(toggle).toHaveTextContent("EN");
    expect(toggle.getAttribute("href")).toMatch(/\/en$/);
    expect(toggle).toHaveAttribute("aria-label", "Switch to English");
  });

  it("Given English language, when component renders, then it should display 'ES' and link to Spanish version", () => {
    // Arrange
    (useLanguage as jest.Mock).mockReturnValue({
      language: "en",
    });

    // Act
    render(<LanguageToggle />);

    // Assert
    const toggle = screen.getByTestId("button-language-toggle");
    expect(toggle).toHaveTextContent("ES");
    expect(toggle.getAttribute("href")).toBe("/");
    expect(toggle).toHaveAttribute("aria-label", "Switch to Spanish");
  });

  it("Given a custom className, when component renders, then it should apply the class", () => {
    // Arrange
    (useLanguage as jest.Mock).mockReturnValue({
      language: "es",
    });

    // Act
    render(<LanguageToggle className="custom-test-class" />);

    // Assert
    const toggle = screen.getByTestId("button-language-toggle");
    expect(toggle).toHaveClass("custom-test-class");
  });

  it("Given a specific lang prop, when component renders, then it should pass it to useLanguage", () => {
    // Arrange
    (useLanguage as jest.Mock).mockReturnValue({
      language: "en",
    });

    // Act
    render(<LanguageToggle lang="en" />);

    // Assert
    expect(useLanguage).toHaveBeenCalledWith("en");
  });

  it("Given a non-root base URL, when component renders, then it should include the base in the href", () => {
    // Arrange
    (useLanguage as jest.Mock).mockReturnValue({
      language: "es",
    });
    (getBaseUrl as jest.Mock).mockReturnValue("/subpath");

    // Act
    render(<LanguageToggle />);

    // Assert
    const toggle = screen.getByTestId("button-language-toggle");
    expect(toggle).toHaveAttribute("href", "/subpath/en");
  });
});
