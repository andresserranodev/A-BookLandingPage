import { render, screen, fireEvent } from "@testing-library/react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../carousel";

// Mock embla-carousel-react
const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();
const mockCanScrollPrev = jest.fn(() => true);
const mockCanScrollNext = jest.fn(() => true);
const mockOn = jest.fn();
const mockOff = jest.fn();

const createMockApi = (overrides = {}) => ({
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  canScrollPrev: mockCanScrollPrev,
  canScrollNext: mockCanScrollNext,
  on: mockOn,
  off: mockOff,
  ...overrides,
});

jest.mock("embla-carousel-react", () => {
  return jest.fn(() => {
    const mockRef = jest.fn();
    const mockApi = createMockApi();
    return [mockRef, mockApi];
  });
});

// Get the mocked module
const mockedUseEmblaCarousel = useEmblaCarousel as unknown as jest.Mock;

describe("Carousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCanScrollPrev.mockReturnValue(true);
    mockCanScrollNext.mockReturnValue(true);
    mockedUseEmblaCarousel.mockImplementation(() => {
      const mockRef = jest.fn();
      const mockApi = createMockApi();
      return [mockRef, mockApi];
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Carousel Component", () => {
    it("renders with children", () => {
      render(
        <Carousel>
          <div data-testid="carousel-child">Child content</div>
        </Carousel>
      );

      expect(screen.getByTestId("carousel-child")).toBeInTheDocument();
    });

    it("renders with correct role and aria attributes", () => {
      render(
        <Carousel>
          <div>Content</div>
        </Carousel>
      );

      const carousel = screen.getByRole("region");
      expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    });

    it("applies custom className", () => {
      render(
        <Carousel className="custom-class">
          <div>Content</div>
        </Carousel>
      );

      const carousel = screen.getByRole("region");
      expect(carousel.className).toContain("custom-class");
    });

    it("initializes with horizontal orientation by default", () => {
      render(
        <Carousel>
          <div>Content</div>
        </Carousel>
      );

      expect(mockedUseEmblaCarousel).toHaveBeenCalledWith(
        expect.objectContaining({ axis: "x" }),
        undefined
      );
    });

    it("initializes with vertical orientation when specified", () => {
      render(
        <Carousel orientation="vertical">
          <div>Content</div>
        </Carousel>
      );

      expect(mockedUseEmblaCarousel).toHaveBeenCalledWith(
        expect.objectContaining({ axis: "y" }),
        undefined
      );
    });

    it("calls setApi when api is available and setApi is provided", () => {
      const mockSetApi = jest.fn();

      render(
        <Carousel setApi={mockSetApi}>
          <div>Content</div>
        </Carousel>
      );

      expect(mockSetApi).toHaveBeenCalled();
    });

    it("passes options to useEmblaCarousel", () => {
      const opts = { loop: true, align: "start" as const };

      render(
        <Carousel opts={opts}>
          <div>Content</div>
        </Carousel>
      );

      expect(mockedUseEmblaCarousel).toHaveBeenCalledWith(
        expect.objectContaining({ loop: true, align: "start" }),
        undefined
      );
    });
  });

  describe("Keyboard Navigation", () => {
    it("scrolls to previous slide on ArrowLeft key", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const carousel = screen.getByRole("region");
      fireEvent.keyDown(carousel, { key: "ArrowLeft" });

      expect(mockScrollPrev).toHaveBeenCalled();
    });

    it("scrolls to next slide on ArrowRight key", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const carousel = screen.getByRole("region");
      fireEvent.keyDown(carousel, { key: "ArrowRight" });

      expect(mockScrollNext).toHaveBeenCalled();
    });

    it("does not respond to other keys", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const carousel = screen.getByRole("region");
      fireEvent.keyDown(carousel, { key: "ArrowUp" });
      fireEvent.keyDown(carousel, { key: "ArrowDown" });
      fireEvent.keyDown(carousel, { key: "Enter" });

      expect(mockScrollPrev).not.toHaveBeenCalled();
      expect(mockScrollNext).not.toHaveBeenCalled();
    });
  });

  describe("CarouselContent", () => {
    it("renders children inside content area", () => {
      render(
        <Carousel>
          <CarouselContent>
            <div data-testid="content-child">Content</div>
          </CarouselContent>
        </Carousel>
      );

      expect(screen.getByTestId("content-child")).toBeInTheDocument();
    });

    it("applies horizontal layout by default", () => {
      render(
        <Carousel>
          <CarouselContent data-testid="carousel-content">
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const content = screen.getByTestId("carousel-content");
      expect(content.className).toContain("-ml-4");
    });

    it("applies vertical layout when orientation is vertical", () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent data-testid="carousel-content">
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const content = screen.getByTestId("carousel-content");
      expect(content.className).toContain("-mt-4");
      expect(content.className).toContain("flex-col");
    });
  });

  describe("CarouselItem", () => {
    it("renders with correct role and aria attributes", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide content</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const item = screen.getByRole("group");
      expect(item).toHaveAttribute("aria-roledescription", "slide");
    });

    it("renders children correctly", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <span data-testid="item-content">Slide content</span>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      expect(screen.getByTestId("item-content")).toBeInTheDocument();
    });

    it("applies horizontal padding by default", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem data-testid="carousel-item">Slide</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const item = screen.getByTestId("carousel-item");
      expect(item.className).toContain("pl-4");
    });

    it("applies vertical padding when orientation is vertical", () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent>
            <CarouselItem data-testid="carousel-item">Slide</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const item = screen.getByTestId("carousel-item");
      expect(item.className).toContain("pt-4");
    });

    it("applies custom className", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem className="custom-item" data-testid="carousel-item">
              Slide
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      const item = screen.getByTestId("carousel-item");
      expect(item.className).toContain("custom-item");
    });
  });

  describe("CarouselPrevious", () => {
    it("renders previous button with correct aria label", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      );

      expect(screen.getByText("Previous slide")).toBeInTheDocument();
    });

    it("calls scrollPrev when clicked", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      );

      const prevButton = screen.getByRole("button", { name: /previous/i });
      fireEvent.click(prevButton);

      expect(mockScrollPrev).toHaveBeenCalled();
    });

    it("is disabled when canScrollPrev is false", () => {
      mockCanScrollPrev.mockReturnValue(false);
      mockedUseEmblaCarousel.mockImplementation(() => {
        const mockRef = jest.fn();
        const mockApi = createMockApi({
          canScrollPrev: () => false,
        });
        return [mockRef, mockApi];
      });

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      );

      const prevButton = screen.getByRole("button", { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });
  });

  describe("CarouselNext", () => {
    it("renders next button with correct aria label", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      );

      expect(screen.getByText("Next slide")).toBeInTheDocument();
    });

    it("calls scrollNext when clicked", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      );

      const nextButton = screen.getByRole("button", { name: /next/i });
      fireEvent.click(nextButton);

      expect(mockScrollNext).toHaveBeenCalled();
    });

    it("is disabled when canScrollNext is false", () => {
      mockCanScrollNext.mockReturnValue(false);
      mockedUseEmblaCarousel.mockImplementation(() => {
        const mockRef = jest.fn();
        const mockApi = createMockApi({
          canScrollNext: () => false,
        });
        return [mockRef, mockApi];
      });

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      );

      const nextButton = screen.getByRole("button", { name: /next/i });
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Context Error Handling", () => {
    // Suppress console.error for this test since we expect an error
    const originalError = console.error;
    beforeAll(() => {
      console.error = jest.fn();
    });
    afterAll(() => {
      console.error = originalError;
    });

    it("CarouselContent throws error when used outside Carousel", () => {
      expect(() => {
        render(<CarouselContent>Content</CarouselContent>);
      }).toThrow("useCarousel must be used within a <Carousel />");
    });

    it("CarouselItem throws error when used outside Carousel", () => {
      expect(() => {
        render(<CarouselItem>Item</CarouselItem>);
      }).toThrow("useCarousel must be used within a <Carousel />");
    });

    it("CarouselPrevious throws error when used outside Carousel", () => {
      expect(() => {
        render(<CarouselPrevious />);
      }).toThrow("useCarousel must be used within a <Carousel />");
    });

    it("CarouselNext throws error when used outside Carousel", () => {
      expect(() => {
        render(<CarouselNext />);
      }).toThrow("useCarousel must be used within a <Carousel />");
    });
  });

  describe("Event Subscriptions", () => {
    it("subscribes to carousel events on mount", () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      expect(mockOn).toHaveBeenCalledWith("reInit", expect.any(Function));
      expect(mockOn).toHaveBeenCalledWith("select", expect.any(Function));
    });

    it("unsubscribes from select event on unmount", () => {
      const { unmount } = render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide</CarouselItem>
          </CarouselContent>
        </Carousel>
      );

      unmount();

      expect(mockOff).toHaveBeenCalledWith("select", expect.any(Function));
    });
  });
});
