export type ArtistProfile = {
  name: string;
  tagline: string;
  bioShort: string;
  bioLong: string;
  city: string;
  neighborhood: string;
  studioName: string;
  availability: string;
  experienceSummary: string;
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
  name: "Fernanda Borges",
  tagline: "Blackwork • Black & Red",
  bioShort: "Tatuagens autorais com identidade forte, contraste preciso e composição profissional.",
  bioLong:
    "Fernanda Borges atende em Pinheiros, SP, com foco em Blackwork e Black & Red, desenvolvendo projetos autorais com abordagem técnica e estética consistente. O processo de atendimento é estruturado para alinhar proposta visual, posicionamento no corpo e execução segura.",
  city: "SP",
  neighborhood: "Pinheiros",
  studioName: "Atendimento em Pinheiros",
  availability: "Agenda mensal aberta",
  experienceSummary: "Atendimento profissional com foco em direção artística e execução consistente.",
  favoriteStyles: ["Blackwork", "Black & Red"],
  inspirations: ["Composição gráfica", "Contraste de massas", "Linguagem autoral contemporânea"],
  email: "contato@exemplo.com",
  phone: "Atendimento via WhatsApp",
  whatsappUrl: "https://api.whatsapp.com/message/R4LIOWS74LHWP1?autoload=1&app_absent=0&utm_source=ig",
  instagramUrl: "https://www.instagram.com/fe.borgesink/",
  mapUrl: "https://maps.google.com/?q=Pinheiros,+Sao+Paulo",
  workingHours: "Atendimento com horário marcado",
  portraitImage: {
    src: "/images/artist-portrait.svg",
    alt: "Retrato profissional da tatuadora Fernanda Borges"
  },
  heroImage: {
    src: "/images/hero-studio.svg",
    alt: "Ambiente de trabalho da tatuadora Fernanda Borges em Pinheiros, SP"
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
