import { render, screen, fireEvent } from "@testing-library/react";
import ReviewsSection from "./ReviewsSection";

jest.mock("@/hooks/useLanguage", () => ({
  useLanguage: jest.fn(() => ({
    t: {
      reviews: {
        heading: "Lo que dicen los lectores",
        seeMore: "Ver más",
        seeLess: "Ver menos",
        humberto: [
          "El libro está genial, me gustó mucho, la narración es muy ágil y los comentarios que sazonan las anécdotas le agregan mucha vivacidad.",
          "Es tremenda aventura en mi opinión.",
          "Third paragraph to guarantee the button shows up.",
        ],
        alejandro: ["Sr… hoy lo empecé en la mañana y ya terminé. Muy bueno."],
        norileoluegoexisto: [
          "Para quienes llevamos tiempo aplazando nuestros, sueños, planes o proyectos.",
        ],
      },
    },
  })),
}));

describe("ReviewsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Given a set of reviews, when component renders, then it should display all reviewer names", () => {
    render(<ReviewsSection lang="es" />);

    expect(screen.getByText("Humberto")).toBeInTheDocument();
    expect(screen.getByText("Alejandro")).toBeInTheDocument();
    expect(
      screen.getByText("norileoluegoexisto (tiempo_de_leer)")
    ).toBeInTheDocument();
  });

  it("Given long reviews, when component renders, then it should display a 'see more' button", () => {
    render(<ReviewsSection lang="es" />);

    // Humberto has 3 paragraphs in our mock, so it should trigger the collapsible condition
    const seeMoreButtons = screen.getAllByRole("button", { name: /Ver más/i });
    expect(seeMoreButtons.length).toBeGreaterThan(0);
  });

  it("Given a 'see more' button, when user clicks it, then it should change to 'see less'", async () => {
    render(<ReviewsSection lang="es" />);
    const seeMoreButtons = screen.getAllByRole("button", { name: /Ver más/i });

    fireEvent.click(seeMoreButtons[0]);

    expect(
      screen.getByRole("button", { name: /Ver menos/i })
    ).toBeInTheDocument();
  });
});
