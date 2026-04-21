export type Testimonial = {
  id: number;
  name: string;
  comment: string;
  source: string;
  image?: string;
};

export const testimonials = [
  {
    id: 1,
    name: "Marina L.",
    comment:
      "A Ana transformou minha ideia em uma arte elegante. Atendimento super cuidadoso do briefing ao pós." ,
    source: "Print autorizado via Instagram",
    image: "/images/testimonials/client-1.svg"
  },
  {
    id: 2,
    name: "Fernanda R.",
    comment:
      "Estúdio impecável, processo transparente e resultado muito acima do que eu esperava. Já marquei a próxima sessão." ,
    source: "Print autorizado via WhatsApp",
    image: "/images/testimonials/client-2.svg"
  },
  {
    id: 3,
    name: "Lucas M.",
    comment:
      "Fechamento em andamento com planejamento excelente. Traço firme, composição bem pensada e cicatrização perfeita." ,
    source: "Depoimento direto no formulário",
    image: "/images/testimonials/client-3.svg"
  }
] as const satisfies Testimonial[];
