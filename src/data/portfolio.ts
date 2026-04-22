export type PortfolioCategory = "Blackwork" | "Black & Red" | "Flash autoral" | "Projetos fechados";

export type PortfolioItem = {
  id: number;
  title: string;
  category: PortfolioCategory;
  bodyPart: string;
  technique: string;
  image: string;
  alt: string;
  healed: boolean;
  beforeAfter: boolean;
  closeUp?: boolean;
  fresh?: boolean;
  featured?: boolean;
};

export const portfolioCategories: Array<"Todas" | PortfolioCategory> = [
  "Todas",
  "Blackwork",
  "Black & Red",
  "Flash autoral",
  "Projetos fechados"
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Peça gráfica em preto sólido",
    category: "Blackwork",
    bodyPart: "Antebraço",
    technique: "Blackwork de contraste",
    image: "/images/portfolio/blackwork-panther.svg",
    alt: "Tatuagem blackwork com composição gráfica no antebraço",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false,
    featured: true
  },
  {
    id: 2,
    title: "Serpente autoral",
    category: "Blackwork",
    bodyPart: "Panturrilha",
    technique: "Preto sólido e volume",
    image: "/images/portfolio/blackwork-serpent.svg",
    alt: "Tatuagem de serpente em blackwork na panturrilha",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true,
    featured: true
  },
  {
    id: 3,
    title: "Composição Black & Red",
    category: "Black & Red",
    bodyPart: "Costela",
    technique: "Preto + acento vermelho",
    image: "/images/portfolio/ornamental-clavicle.svg",
    alt: "Tatuagem black and red com elemento central em vermelho na costela",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false,
    featured: true
  },
  {
    id: 4,
    title: "Painel de alto contraste",
    category: "Blackwork",
    bodyPart: "Braço",
    technique: "Massa escura com recortes",
    image: "/images/portfolio/anime-manga.svg",
    alt: "Painel blackwork em alto contraste no braço",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true,
    featured: true
  },
  {
    id: 5,
    title: "Flash dark ornamental",
    category: "Flash autoral",
    bodyPart: "Clavícula",
    technique: "Flash autoral em preto",
    image: "/images/portfolio/ornamental-clavicle.svg",
    alt: "Flash autoral dark em blackwork na clavícula",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 6,
    title: "Lettering dark",
    category: "Blackwork",
    bodyPart: "Pulso",
    technique: "Lettering em tinta preta",
    image: "/images/portfolio/lettering-script.svg",
    alt: "Lettering em blackwork no pulso",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 7,
    title: "Símbolo em preto e vermelho",
    category: "Black & Red",
    bodyPart: "Tornozelo",
    technique: "Micro composição dual-tone",
    image: "/images/portfolio/small-lunar.svg",
    alt: "Tatuagem pequena em preto e vermelho no tornozelo",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 8,
    title: "Projeto de fechamento",
    category: "Projetos fechados",
    bodyPart: "Braço completo",
    technique: "Planejamento por sessões",
    image: "/images/portfolio/sleeve-botanical.svg",
    alt: "Projeto de fechamento blackwork em andamento no braço",
    healed: false,
    beforeAfter: true,
    closeUp: false,
    fresh: true,
    featured: true
  },
  {
    id: 9,
    title: "Composição vertical em blackwork",
    category: "Blackwork",
    bodyPart: "Ombro",
    technique: "Linework + preenchimento",
    image: "/images/portfolio/blackwork-serpent.svg",
    alt: "Composição vertical blackwork no ombro",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 10,
    title: "Pantera em contraste",
    category: "Blackwork",
    bodyPart: "Coxa",
    technique: "Massa escura em destaque",
    image: "/images/portfolio/blackwork-panther.svg",
    alt: "Pantera em blackwork na coxa",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true
  },
  {
    id: 11,
    title: "Peça Black & Red de fluxo",
    category: "Black & Red",
    bodyPart: "Costas",
    technique: "Contraste progressivo",
    image: "/images/portfolio/blackwork-panther.svg",
    alt: "Projeto black and red nas costas com fluxo vertical",
    healed: true,
    beforeAfter: false,
    closeUp: false,
    fresh: false
  },
  {
    id: 12,
    title: "Ornamental dark",
    category: "Flash autoral",
    bodyPart: "Esterno",
    technique: "Flash ornamental em preto",
    image: "/images/portfolio/ornamental-sternum.svg",
    alt: "Flash ornamental blackwork no esterno",
    healed: false,
    beforeAfter: false,
    closeUp: true,
    fresh: true
  }
];
