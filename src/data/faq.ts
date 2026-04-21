export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Como pedir orçamento?",
    answer:
      "Envie no WhatsApp ou formulário: ideia, tamanho aproximado, região do corpo e referências. Com isso já retorno faixa de investimento e disponibilidade."
  },
  {
    id: 2,
    question: "Qual o valor mínimo?",
    answer: "O valor mínimo atual para sessão é de R$ 350, variando conforme complexidade, tempo e técnica."
  },
  {
    id: 3,
    question: "Faz retoque?",
    answer:
      "Sim. O primeiro retoque é avaliado sem custo em até 60 dias após cicatrização, seguindo as orientações de cuidado."
  },
  {
    id: 4,
    question: "Quanto tempo dura a sessão?",
    answer:
      "Sessões pequenas costumam durar de 1h a 2h. Projetos maiores podem ser divididos em encontros de 3h a 6h."
  },
  {
    id: 5,
    question: "Posso levar referência?",
    answer:
      "Sim. Referências ajudam no briefing. O desenho final é autoral, adaptado ao seu corpo e à sua proposta."
  },
  {
    id: 6,
    question: "Como funciona o sinal?",
    answer:
      "Para reservar data é necessário sinal de 30%. O valor é abatido no dia da sessão e garante sua vaga na agenda."
  },
  {
    id: 7,
    question: "Quais são os cuidados antes e depois?",
    answer:
      "Antes: alimentação leve, hidratação e sem álcool por 24h. Depois: higienização correta, pomada indicada e evitar sol, piscina e atrito no período de cicatrização."
  },
  {
    id: 8,
    question: "Faz cover-up?",
    answer: "Faço sim, mediante avaliação da tatuagem antiga. Em alguns casos, pode ser necessário clareamento prévio."
  },
  {
    id: 9,
    question: "Atende por ordem de chegada ou só com hora marcada?",
    answer: "Atendimento somente com horário agendado para manter qualidade e tempo dedicado ao seu projeto."
  }
];
