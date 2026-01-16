import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "../use-mobile";

describe("useIsMobile", () => {
  const MOBILE_BREAKPOINT = 768;
  let addEventListenerMock: jest.Mock;
  let removeEventListenerMock: jest.Mock;
  let mediaQueryCallback: ((e: { matches: boolean }) => void) | null = null;

  const createMatchMediaMock = (matches: boolean) => {
    addEventListenerMock = jest.fn((event, callback) => {
      if (event === "change") {
        mediaQueryCallback = callback;
      }
    });
    removeEventListenerMock = jest.fn();

    return jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    }));
  };

  beforeEach(() => {
    mediaQueryCallback = null;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns false initially when window.innerWidth is above mobile breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true initially when window.innerWidth is below mobile breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns true when window.innerWidth equals breakpoint - 1", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: MOBILE_BREAKPOINT - 1,
    });
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false when window.innerWidth equals breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: MOBILE_BREAKPOINT,
    });
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("adds event listener on mount", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.matchMedia = createMatchMediaMock(false);

    renderHook(() => useIsMobile());
    expect(addEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("removes event listener on unmount", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.matchMedia = createMatchMediaMock(false);

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("updates when media query changes", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate window resize to mobile
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      if (mediaQueryCallback) {
        mediaQueryCallback({ matches: true });
      }
    });

    expect(result.current).toBe(true);
  });

  it("creates media query with correct breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    const matchMediaMock = createMatchMediaMock(false);
    window.matchMedia = matchMediaMock;

    renderHook(() => useIsMobile());

    expect(matchMediaMock).toHaveBeenCalledWith(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );
  });
});
