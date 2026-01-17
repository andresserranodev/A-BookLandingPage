import { type Language } from "@/lib/translations";

// Default mock implementation
const mockUseLanguage = jest.fn((lang?: Language) => ({
  language: lang || "es",
  t: {
    nav: {
      aboutBook: "Sobre el Libro",
      author: "Autor",
      preorder: "Pre-orden",
    },
    preorder: {
      heading: "Únete a la lista de espera",
      description:
        "Regístrate para recibir actualizaciones exclusivas y ser de los primeros en obtener tu copia cuando esté disponible.",
      joinButton: "Unirme a la lista",
      waitlistCount: "Más de 100 personas ya están esperando",
    },
    hero: {
      title: "Un viaje en moto",
      subtitle: "De Colombia a la Patagonia",
      cta: "Descubre la historia",
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
      copyright: "© 2025 Un Andrés Más",
    },
  },
}));

export const useLanguage = mockUseLanguage;
