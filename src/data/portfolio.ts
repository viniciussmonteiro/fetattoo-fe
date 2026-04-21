export type PortfolioCategory =
  | "Fine line"
  | "Blackwork"
  | "Floral"
  | "Anime"
  | "Ornamental"
  | "Lettering"
  | "Tatuagens pequenas"
  | "Fechamentos / projetos grandes";

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
  "Fine line",
  "Blackwork",
  "Floral",
  "Anime",
  "Ornamental",
  "Lettering",
  "Tatuagens pequenas",
  "Fechamentos / projetos grandes"
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Rosa botânica em fine line",
    category: "Fine line",
    bodyPart: "Antebraço",
    technique: "Traço único + sombreamento suave",
    image: "/images/portfolio/fine-line-rose.svg",
    alt: "Tatuagem de rosa botânica em fine line no antebraço com traços delicados",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false,
    featured: true
  },
  {
    id: 2,
    title: "Serpente blackwork",
    category: "Blackwork",
    bodyPart: "Panturrilha",
    technique: "Preto sólido + contraste",
    image: "/images/portfolio/blackwork-serpent.svg",
    alt: "Tatuagem blackwork de serpente em composição vertical na panturrilha",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true,
    featured: true
  },
  {
    id: 3,
    title: "Peônia ornamental",
    category: "Floral",
    bodyPart: "Costela",
    technique: "Floral autoral com linhas finas",
    image: "/images/portfolio/floral-peony.svg",
    alt: "Tatuagem floral de peônia com folhas ornamentais na lateral do tronco",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false,
    featured: true
  },
  {
    id: 4,
    title: "Personagem manga minimal",
    category: "Anime",
    bodyPart: "Braço",
    technique: "Line art + texturas pontilhadas",
    image: "/images/portfolio/anime-manga.svg",
    alt: "Tatuagem inspirada em manga com personagem em traço fino no braço",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true,
    featured: true
  },
  {
    id: 5,
    title: "Arabescos de clavícula",
    category: "Ornamental",
    bodyPart: "Clavícula",
    technique: "Simetria ornamental",
    image: "/images/portfolio/ornamental-clavicle.svg",
    alt: "Tatuagem ornamental simétrica acompanhando a clavícula",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 6,
    title: "Lettering em script",
    category: "Lettering",
    bodyPart: "Pulso",
    technique: "Caligrafia fina",
    image: "/images/portfolio/lettering-script.svg",
    alt: "Tatuagem em lettering cursivo no pulso com acabamento clean",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 7,
    title: "Símbolo lunar minimal",
    category: "Tatuagens pequenas",
    bodyPart: "Tornozelo",
    technique: "Traço fino minimalista",
    image: "/images/portfolio/small-lunar.svg",
    alt: "Tatuagem pequena de símbolo lunar no tornozelo",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 8,
    title: "Fechamento botânico",
    category: "Fechamentos / projetos grandes",
    bodyPart: "Braço completo",
    technique: "Projeto modular em sessões",
    image: "/images/portfolio/sleeve-botanical.svg",
    alt: "Projeto de fechamento de braço com elementos botânicos em preto",
    healed: false,
    beforeAfter: true,
    closeUp: false,
    fresh: true,
    featured: true
  },
  {
    id: 9,
    title: "Constelação delicada",
    category: "Fine line",
    bodyPart: "Ombro",
    technique: "Pontos finos e micro linhas",
    image: "/images/portfolio/fine-line-constellation.svg",
    alt: "Tatuagem de constelação em fine line no ombro",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 10,
    title: "Pantera sólida",
    category: "Blackwork",
    bodyPart: "Coxa",
    technique: "Blackwork com áreas chapadas",
    image: "/images/portfolio/blackwork-panther.svg",
    alt: "Tatuagem de pantera blackwork com alto contraste na coxa",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true
  },
  {
    id: 11,
    title: "Lírios em movimento",
    category: "Floral",
    bodyPart: "Costas",
    technique: "Floral de fluxo longo",
    image: "/images/portfolio/floral-lilies.svg",
    alt: "Composição floral de lírios em traço delicado nas costas",
    healed: true,
    beforeAfter: false,
    closeUp: false,
    fresh: false
  },
  {
    id: 12,
    title: "Painel ornamental",
    category: "Ornamental",
    bodyPart: "Esterno",
    technique: "Ornamental geométrico",
    image: "/images/portfolio/ornamental-sternum.svg",
    alt: "Tatuagem ornamental geométrica no esterno com linhas refinadas",
    healed: false,
    beforeAfter: false,
    closeUp: true,
    fresh: true
  },
  {
    id: 13,
    title: "Frase minimal",
    category: "Lettering",
    bodyPart: "Clavícula",
    technique: "Lettering leve e contínuo",
    image: "/images/portfolio/lettering-minimal.svg",
    alt: "Frase minimalista tatuada na região da clavícula",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 14,
    title: "Mini flor em linha única",
    category: "Tatuagens pequenas",
    bodyPart: "Dedos",
    technique: "Linework de micro escala",
    image: "/images/portfolio/small-lineflower.svg",
    alt: "Tatuagem pequena de flor em linha única nos dedos",
    healed: true,
    beforeAfter: false,
    closeUp: true,
    fresh: false
  },
  {
    id: 15,
    title: "Cover-up floral",
    category: "Fechamentos / projetos grandes",
    bodyPart: "Antebraço",
    technique: "Cobertura com volume floral",
    image: "/images/portfolio/coverup-floral.svg",
    alt: "Antes e depois de cover-up floral cobrindo tatuagem antiga",
    healed: false,
    beforeAfter: true,
    closeUp: false,
    fresh: true
  },
  {
    id: 16,
    title: "Painel anime sombreado",
    category: "Anime",
    bodyPart: "Coxa lateral",
    technique: "Line art com sombreado pontilhado",
    image: "/images/portfolio/anime-panel.svg",
    alt: "Tatuagem estilo anime com painel narrativo na lateral da coxa",
    healed: false,
    beforeAfter: false,
    closeUp: false,
    fresh: true
  }
];
