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
    buttonColombia: string;
    buttonOtherCountries: string;
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
    buttonColombia: string;
    buttonOtherCountries: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  reviews: {
    heading: string;
    seeMore: string;
    seeLess: string;
    humberto: string[];
    alejandro: string[];
    norileoluegoexisto: string[];
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
      buttonColombia: "Order in Colombia",
      buttonOtherCountries: "Other Countries",
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
      attribution: "Written by: Carolina Flórez",
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
      buttonColombia: "Order in Colombia",
      buttonOtherCountries: "Other Countries",
    },
    footer: {
      tagline: "A story of adventure, discovery, and transformation",
      copyright: "© 2026 Andrés Serrano Vivas",
    },
    reviews: {
      heading: "What Readers Are Saying",
      seeMore: "See more",
      seeLess: "See less",
      humberto: [
        "El libro está genial, me gustó mucho, la narración es muy ágil y los comentarios que sazonan las anécdotas le agregan mucha vivacidad.",
        "Es tremenda aventura en mi opinión, no solo ese recorrido inmenso y esa contemplación del mundo natural, todo lo que rodeó el trayecto, la gente que se conoció, las amistades que se forjaron, las solidaridades inesperadas, la sorpresiva enfermedad y su convalecencia ... En fin, que millón de cosas, y tantas otras más, imagino yo que no están en el papel por numerosas o intransmisibles.",
        "Los anexos también son muy divertidos de leer, y las seis P, muy útiles.",
        "Quedo pendiente del recuento de ese futuro viaje a Alaska, seguramente inspirará relatos -que no simplemente relaciones de hechos- y dejará experiencias y saberes entrañables",
        "Mucha alegría, mucha salud, mucho amor, larga vida junto a toda la gente querida.",
      ],
      alejandro: [
        "Sr… hoy lo empecé en la mañana y ya terminé. Muy bueno y muy claro super felicitaciones. Saque muchos tips. De pueblos y sitios y cosas. Esta muy bien escrita l historia.",
        "Andresito cuando algo es bueno se lo come uno muy rapido… la verdad tengo pa verme la serie y el libro q recomendaste para empacar.",
      ],
      norileoluegoexisto: [
        "Para quienes llevamos tiempo aplazando nuestros, sueños, planes o proyectos este es el libro perfecto para tomar la decisión y empezar: con miedo, con dudas pero, sobre todo con valentía, algo de humor y mucha preparación.",
        "En cada kilómetro recorrido, David me ha hecho no solo admirarlo, sino también ponerme en sus zapatos y sentirme un poquito aventurera desde la comodidad de mi cama.",
      ],
    },
  },
  es: {
    nav: {
      aboutBook: "Sobre el libro",
      author: "Autor",
      preorder: "Comprar el libro",
    },
    hero: {
      title: "Un Andrés Más",
      subtitle: "Un viaje en moto desde Colombia hasta la Patagonia",
      preorderButton: "Adquirir ahora",
      buttonColombia: "Pídelo en Colombia",
      buttonOtherCountries: "Otros países",
    },
    aboutBook: {
      heading: "Sobre el libro",
      paragraph1:
        "Lo que comienza como un simple viaje en moto por Sudamérica se convierte en un viaje transformador de autodescubrimiento. Desde las vibrantes calles de Bogotá hasta las llanuras azotadas por el viento de la Patagonia, estas memorias capturan la belleza cruda de la aventura.",
      paragraph2:
        "A lo largo de 11,000 kilómetros de camino abierto, a través de siete países e innumerables encuentros, un viajero descubre que los grandes viajes no se miden en distancia—se miden en los momentos que nos cambian para siempre.",
      statMiles: "Kilómetros",
      statCountries: "Países",
      statJourney: "Gran aventura",
      available: "Disponible ahora",
    },
    aboutAuthor: {
      heading: "Sobre el autor",
      bio1: "Andrés David Serrano Vivas es ingeniero y un apasionado viajero en moto. Desde joven ha sentido una curiosidad profunda por entender cómo funcionan las cosas, las máquinas, las personas y la vida misma, curiosidad que ha marcado sus rutas tanto internas como externas.",
      attribution: "Escrito por: Carolina Flórez",
    },
    preorder: {
      heading: "Adquiere tu copia",
      description:
        "Embárcate en este viaje. Pide tu copia hoy y comienza a leer sobre esta gran aventura.",
      emailPlaceholder: "Ingresa tu email",
      joinButton: "Comprar ahora",
      joiningButton: "Procesando...",
      waitlistCount:
        "Únete a cientos de lectores que ya han comenzado el viaje",
      successTitle: "¡Gracias!",
      successDescription:
        "Nos pondremos en contacto contigo pronto sobre tu orden.",
      buttonColombia: "Pídelo en Colombia",
      buttonOtherCountries: "Otros países",
    },
    footer: {
      tagline: "Una historia de aventura, descubrimiento y transformación",
      copyright: "© 2026 Andrés Serrano Vivas",
    },
    reviews: {
      heading: "Lo que dicen los lectores",
      seeMore: "Ver más",
      seeLess: "Ver menos",
      humberto: [
        "El libro está genial, me gustó mucho, la narración es muy ágil y los comentarios que sazonan las anécdotas le agregan mucha vivacidad.",
        "Es tremenda aventura en mi opinión, no solo ese recorrido inmenso y esa contemplación del mundo natural, todo lo que rodeó el trayecto, la gente que se conoció, las amistades que se forjaron, las solidaridades inesperadas, la sorpresiva enfermedad y su convalecencia ... En fin, que millón de cosas, y tantas otras más, imagino yo que no están en el papel por numerosas o intransmisibles.",
        "Los anexos también son muy divertidos de leer, y las seis P, muy útiles.",
        "Quedo pendiente del recuento de ese futuro viaje a Alaska, seguramente inspirará relatos -que no simplemente relaciones de hechos- y dejará experiencias y saberes entrañables",
        "Mucha alegría, mucha salud, mucho amor, larga vida junto a toda la gente querida.",
      ],
      alejandro: [
        "Sr… hoy lo empecé en la mañana y ya terminé. Muy bueno y muy claro super felicitaciones. Saque muchos tips. De pueblos y sitios y cosas. Esta muy bien escrita l historia.",
        "Andresito cuando algo es bueno se lo come uno muy rapido… la verdad tengo pa verme la serie y el libro q recomendaste para empacar.",
      ],
      norileoluegoexisto: [
        "Para quienes llevamos tiempo aplazando nuestros, sueños, planes o proyectos este es el libro perfecto para tomar la decisión y empezar: con miedo, con dudas pero, sobre todo con valentía, algo de humor y mucha preparación.",
        "En cada kilómetro recorrido, David me ha hecho no solo admirarlo, sino también ponerme en sus zapatos y sentirme un poquito aventurera desde la comodidad de mi cama.",
      ],
    },
  },
};
