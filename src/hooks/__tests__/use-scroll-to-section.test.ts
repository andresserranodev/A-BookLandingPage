import { renderHook } from "@testing-library/react";
import { useScrollToSection } from "../use-scroll-to-section";

describe("useScrollToSection", () => {
  let mockScrollIntoView: jest.Mock;
  let mockScrollTo: jest.Mock;

  beforeEach(() => {
    mockScrollIntoView = jest.fn();
    mockScrollTo = jest.fn();

    // Mock document.getElementById
    jest.spyOn(document, "getElementById").mockImplementation((id: string) => {
      if (id === "existing-section") {
        return {
          scrollIntoView: mockScrollIntoView,
        } as unknown as HTMLElement;
      }
      return null;
    });

    // Mock window.scrollTo
    window.scrollTo = mockScrollTo;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns scrollToSection and scrollToTop functions", () => {
    const { result } = renderHook(() => useScrollToSection());

    expect(typeof result.current.scrollToSection).toBe("function");
    expect(typeof result.current.scrollToTop).toBe("function");
  });

  it("scrollToSection calls scrollIntoView with smooth behavior when element exists", () => {
    const { result } = renderHook(() => useScrollToSection());

    result.current.scrollToSection("existing-section");

    expect(document.getElementById).toHaveBeenCalledWith("existing-section");
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("scrollToSection does nothing when element does not exist", () => {
    const { result } = renderHook(() => useScrollToSection());

    result.current.scrollToSection("non-existing-section");

    expect(document.getElementById).toHaveBeenCalledWith(
      "non-existing-section"
    );
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("scrollToTop calls window.scrollTo with smooth behavior", () => {
    const { result } = renderHook(() => useScrollToSection());

    result.current.scrollToTop();

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("functions maintain stable references between renders", () => {
    const { result, rerender } = renderHook(() => useScrollToSection());

    const firstScrollToSection = result.current.scrollToSection;
    const firstScrollToTop = result.current.scrollToTop;

    rerender();

    expect(result.current.scrollToSection).toBe(firstScrollToSection);
    expect(result.current.scrollToTop).toBe(firstScrollToTop);
  });
});
