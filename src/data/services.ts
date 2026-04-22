export type ServiceInfo = {
  title: string;
  description: string;
};

export const serviceHighlights: ServiceInfo[] = [
  {
    title: "Blackwork",
    description: "Composição em preto com contraste forte e leitura sólida."
  },
  {
    title: "Black & Red",
    description: "Projetos autorais com base escura e acentos em vermelho."
  },
  {
    title: "Projetos autorais",
    description: "Direção visual personalizada para cada composição."
  }
];

export const servicesOffered: string[] = [
  "Blackwork autoral",
  "Black & Red com composição personalizada",
  "Projetos autorais desenvolvidos por briefing",
  "Flash com curadoria da artista",
  "Cover-up mediante avaliação técnica"
];

export const servicesNotOffered: string[] = [
  "Cópia exata de tatuagem de outro artista",
  "Projetos fora da linguagem Blackwork / Black & Red",
  "Atendimento sem consulta prévia de viabilidade"
];
