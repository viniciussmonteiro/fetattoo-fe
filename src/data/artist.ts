export type ArtistProfile = {
  name: string;
  tagline: string;
  bioShort: string;
  bioLong: string;
  city: string;
  neighborhood: string;
  studioName: string;
  availability: string;
  experienceYears: number;
  favoriteStyles: string[];
  inspirations: string[];
  email: string;
  phone: string;
  whatsappUrl: string;
  instagramUrl: string;
  mapUrl: string;
  workingHours: string;
  portraitImage: {
    src: string;
    alt: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
};

export const artistProfile: ArtistProfile = {
  name: "Ana Noir Tattoo",
  tagline: "Fine line, blackwork e floral",
  bioShort: "Tatuagens autorais com traço delicado, composição elegante e identidade artística.",
  bioLong:
    "Sou Ana Noir, tatuadora em São Paulo com foco em projetos autorais em fine line, blackwork e floral contemporâneo. Meu atendimento é consultivo: cada tatuagem nasce de um briefing detalhado para alinhar estética, anatomia e significado.",
  city: "São Paulo",
  neighborhood: "Vila Mariana",
  studioName: "Noir Atelier Tattoo",
  availability: "Agenda mensal aberta",
  experienceYears: 7,
  favoriteStyles: ["Fine line botânico", "Blackwork de contraste", "Floral de fluxo longo"],
  inspirations: ["Ilustração botânica", "Gravura contemporânea", "Design editorial"],
  email: "contato@ananoirtattoo.com.br",
  phone: "(11) 99999-9999",
  whatsappUrl: "https://wa.me/5511999999999?text=Oi%2C%20Ana%20Noir!%20Quero%20agendar%20uma%20tatuagem.",
  instagramUrl: "https://instagram.com/ananoirtattoo",
  mapUrl: "https://maps.google.com/?q=Vila+Mariana,+Sao+Paulo",
  workingHours: "Terça a sábado, das 10h às 19h",
  portraitImage: {
    src: "/images/artist-portrait.svg",
    alt: "Retrato profissional da tatuadora Ana Noir no estúdio"
  },
  heroImage: {
    src: "/images/hero-studio.svg",
    alt: "Ambiente de estúdio de tatuagem com foco no processo artístico"
  }
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Agendamento" },
  { href: "/faq", label: "FAQ" },
  { href: "/cuidados", label: "Cuidados" }
] as const;
