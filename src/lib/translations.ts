export type Language = "en" | "es";

export interface Translations {
  nav: {
    aboutBook: string;
    author: string;
    preorder: string;
  };
  hero: {
    title: string;
    subtitle: string;
    preorderButton: string;
  };
  aboutBook: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    statMiles: string;
    statCountries: string;
    statJourney: string;
    available: string;
  };
  aboutAuthor: {
    heading: string;
    bio1: string;
    attribution: string;
  };
  preorder: {
    heading: string;
    description: string;
    emailPlaceholder: string;
    joinButton: string;
    joiningButton: string;
    waitlistCount: string;
    successTitle: string;
    successDescription: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      aboutBook: "About the Book",
      author: "Author",
      preorder: "Buy the Book",
    },
    hero: {
      title: "Un Andrés Más",
      subtitle: "A Motorcycle Journey from Colombia to Patagonia",
      preorderButton: "Get Your Copy",
    },
    aboutBook: {
      heading: "About the Book",
      paragraph1:
        "What begins as a simple motorcycle trip through South America becomes a transformative journey of self-discovery. From the vibrant streets of Bogotá to the windswept plains of Patagonia, this memoir captures the raw beauty of adventure.",
      paragraph2:
        "Along 6835 miles of open road, through seven countries and countless encounters, one rider discovers that the greatest journeys aren't measured in distance—they're measured in the moments that change us forever.",
      statMiles: "Miles",
      statCountries: "Countries",
      statJourney: "Epic Journey",
      available: "Available Now",
    },
    aboutAuthor: {
      heading: "About the Author",
      bio1: "Andrés is a Colombian-born writer and adventurer whose passion for exploration has taken him across continents. After years in the corporate world, he traded his desk for a motorcycle seat and never looked back.",
      attribution: "Written by: Carolina Florez",
    },
    preorder: {
      heading: "Get Your Copy",
      description:
        "Embark on this journey. Order your copy today and start reading about the adventure.",
      emailPlaceholder: "Enter your email",
      joinButton: "Order Now",
      joiningButton: "Processing...",
      waitlistCount:
        "Join hundreds of readers who have already started the journey",
      successTitle: "Thank you!",
      successDescription: "We will contact you shortly regarding your order.",
    },
    footer: {
      tagline: "A story of adventure, discovery, and transformation",
      copyright: "© 2026 Andres Serrano Vivas",
    },
  },
  es: {
    nav: {
      aboutBook: "Sobre el Libro",
      author: "Autor",
      preorder: "Comprar el Libro",
    },
    hero: {
      title: "Un Andrés Más",
      subtitle: "Un Viaje en Moto desde Colombia hasta la Patagonia",
      preorderButton: "Adquirir ahora",
    },
    aboutBook: {
      heading: "Sobre el Libro",
      paragraph1:
        "Lo que comienza como un simple viaje en moto por Sudamérica se convierte en un viaje transformador de autodescubrimiento. Desde las vibrantes calles de Bogotá hasta las llanuras azotadas por el viento de la Patagonia, estas memorias capturan la belleza cruda de la aventura.",
      paragraph2:
        "A lo largo de 11,000 kilómetros de camino abierto, a través de siete países e innumerables encuentros, un viajero descubre que los grandes viajes no se miden en distancia—se miden en los momentos que nos cambian para siempre.",
      statMiles: "Kilómetros",
      statCountries: "Países",
      statJourney: "Gran Aventura",
      available: "Disponible Ahora",
    },
    aboutAuthor: {
      heading: "Sobre el Autor",
      bio1: "Andrés David Serrano Vivas es ingeniero y un apasionado viajero en moto. Desde joven ha sentido una curiosidad profunda por entender cómo funcionan las cosas, las máquinas, las personas y la vida misma, curiosidad que ha marcado sus rutas tanto internas como externas.",
      attribution: "Escrito por: Carolina Florez",
    },
    preorder: {
      heading: "Adquiere Tu Copia",
      description:
        "Embarcate en este viaje. Pide tu copia hoy y comienza a leer sobre esta gran aventura.",
      emailPlaceholder: "Ingresa tu email",
      joinButton: "Comprar Ahora",
      joiningButton: "Procesando...",
      waitlistCount:
        "Únete a cientos de lectores que ya han comenzado el viaje",
      successTitle: "¡Gracias!",
      successDescription:
        "Nos pondremos en contacto contigo pronto sobre tu orden.",
    },
    footer: {
      tagline: "Una historia de aventura, descubrimiento y transformación",
      copyright: "© 2026 Andres Serrano Vivas",
    },
  },
};
