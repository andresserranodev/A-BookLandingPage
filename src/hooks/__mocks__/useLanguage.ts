import { type Language } from "@/lib/translations";

// Default mock implementation
const mockUseLanguage = jest.fn((lang?: Language) => ({
  language: lang || "es",
  t: {
    nav: {
      aboutBook: "Sobre el libro",
      author: "Autor",
      preorder: "Comprar el libro",
    },
    preorder: {
      heading: "Únete a la lista de espera",
      description:
        "Regístrate para recibir actualizaciones exclusivas y ser de los primeros en obtener tu copia cuando esté disponible.",
      joinButton: "Unirme a la lista",
      waitlistCount: "Más de 100 personas ya están esperando",
      buttonColombia: "Pídelo en Colombia",
      buttonOtherCountries: "Otros Países",
    },
    hero: {
      title: "Un viaje en moto",
      subtitle: "De Colombia a la Patagonia",
      cta: "Descubre la historia",
      buttonColombia: "Pídelo en Colombia",
      buttonOtherCountries: "Otros Países",
    },
    about: {
      title: "Sobre el libro",
      description: "Una historia de aventura y descubrimiento",
    },
    author: {
      name: "Andrés David",
      bio: "Autor y aventurero",
    },
    footer: {
      tagline: "Una historia de aventura, descubrimiento y transformación",
      copyright: "© 2026 Andrés Serrano Vivas",
    },
  },
}));

export const useLanguage = mockUseLanguage;
