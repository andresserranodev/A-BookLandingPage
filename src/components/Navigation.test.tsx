import { render, screen, fireEvent, act } from "@testing-library/react";
import Navigation from "./Navigation";
import { NAV_SECTIONS, SITE_CONFIG } from "@/lib/constants";

// Mock the hooks
jest.mock("@/hooks/useLanguage");

const mockScrollToSection = jest.fn();
const mockScrollToTop = jest.fn();

jest.mock("@/hooks/use-scroll-to-section", () => ({
  useScrollToSection: () => ({
    scrollToSection: mockScrollToSection,
    scrollToTop: mockScrollToTop,
  }),
}));

// Mock LanguageToggle to simplify testing
jest.mock("./LanguageToggle", () => {
  return function MockLanguageToggle({ className }: { className?: string }) {
    return (
      <button data-testid="button-language-toggle" className={className}>
        EN
      </button>
    );
  };
});

describe("Navigation", () => {
  let scrollEventListener: ((event: Event) => void) | null = null;

  beforeEach(() => {
    jest.clearAllMocks();
    scrollEventListener = null;

    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Capture the scroll event listener
    jest
      .spyOn(window, "addEventListener")
      .mockImplementation((event, handler) => {
        if (event === "scroll") {
          scrollEventListener = handler as (event: Event) => void;
        }
      });

    jest.spyOn(window, "removeEventListener").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders navigation with correct structure", () => {
    render(<Navigation />);

    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("link-logo")).toBeInTheDocument();
  });

  it("renders site title in logo", () => {
    render(<Navigation />);

    expect(screen.getByTestId("link-logo")).toHaveTextContent(
      SITE_CONFIG.title
    );
  });

  it("renders all navigation links", () => {
    render(<Navigation />);

    NAV_SECTIONS.forEach((section) => {
      expect(screen.getByTestId(`link-nav-${section.id}`)).toBeInTheDocument();
    });
  });

  it("renders navigation links with correct text from translations", () => {
    render(<Navigation />);

    expect(screen.getByTestId("link-nav-about")).toHaveTextContent(
      "Sobre el libro"
    );
    expect(screen.getByTestId("link-nav-author")).toHaveTextContent("Autor");
    expect(screen.getByTestId("link-nav-preorder")).toHaveTextContent(
      "Pre-orden"
    );
  });

  it("renders mobile menu button", () => {
    render(<Navigation />);

    expect(screen.getByTestId("button-mobile-menu")).toBeInTheDocument();
  });

  it("mobile menu is hidden by default", () => {
    render(<Navigation />);

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("mobile menu opens when toggle button is clicked", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByTestId("button-mobile-menu"));

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("mobile menu closes when toggle button is clicked again", () => {
    render(<Navigation />);

    // Open menu
    fireEvent.click(screen.getByTestId("button-mobile-menu"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Close menu
    fireEvent.click(screen.getByTestId("button-mobile-menu"));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("mobile menu displays all navigation links", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByTestId("button-mobile-menu"));

    NAV_SECTIONS.forEach((section) => {
      expect(
        screen.getByTestId(`link-mobile-${section.id}`)
      ).toBeInTheDocument();
    });
  });

  it("navigation has transparent background when not scrolled", () => {
    render(<Navigation />);

    const nav = screen.getByTestId("navigation");
    expect(nav.className).toContain("bg-transparent");
  });

  it("navigation has solid background when scrolled past threshold", () => {
    render(<Navigation />);

    // Simulate scrolling past 50px threshold
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 100,
      });
      if (scrollEventListener) {
        scrollEventListener(new Event("scroll"));
      }
    });

    const nav = screen.getByTestId("navigation");
    expect(nav.className).toContain("bg-background/95");
    expect(nav.className).toContain("backdrop-blur-md");
  });

  it("navigation styling changes at exactly 50px threshold", () => {
    render(<Navigation />);

    // Scroll to exactly 50px - should NOT trigger scrolled state
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 50,
      });
      if (scrollEventListener) {
        scrollEventListener(new Event("scroll"));
      }
    });

    let nav = screen.getByTestId("navigation");
    expect(nav.className).toContain("bg-transparent");

    // Scroll to 51px - should trigger scrolled state
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 51,
      });
      if (scrollEventListener) {
        scrollEventListener(new Event("scroll"));
      }
    });

    nav = screen.getByTestId("navigation");
    expect(nav.className).toContain("bg-background/95");
  });

  it("logo click calls scrollToTop", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByTestId("link-logo"));

    expect(mockScrollToTop).toHaveBeenCalledTimes(1);
  });

  it("navigation link click calls scrollToSection with correct id", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByTestId("link-nav-about"));

    expect(mockScrollToSection).toHaveBeenCalledWith("about");
  });

  it("mobile navigation link click calls scrollToSection and closes menu", () => {
    render(<Navigation />);

    // Open mobile menu
    fireEvent.click(screen.getByTestId("button-mobile-menu"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Click a mobile nav link
    fireEvent.click(screen.getByTestId("link-mobile-author"));

    expect(mockScrollToSection).toHaveBeenCalledWith("author");
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("renders language toggle", () => {
    render(<Navigation />);

    // Both desktop and mobile versions
    const toggles = screen.getAllByTestId("button-language-toggle");
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it("adds scroll event listener on mount", () => {
    render(<Navigation />);

    expect(window.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("removes scroll event listener on unmount", () => {
    const { unmount } = render(<Navigation />);

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("logo has correct styling when not scrolled", () => {
    render(<Navigation />);

    const logo = screen.getByTestId("link-logo");
    expect(logo.className).toContain("text-white");
  });

  it("logo has correct styling when scrolled", () => {
    render(<Navigation />);

    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 100,
      });
      if (scrollEventListener) {
        scrollEventListener(new Event("scroll"));
      }
    });

    const logo = screen.getByTestId("link-logo");
    expect(logo.className).toContain("text-foreground");
  });
});
