export type ProcessStep = {
  id: number;
  title: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  { id: 1, title: "Cliente entra em contato", detail: "Via WhatsApp, formulário ou Instagram." },
  { id: 2, title: "Envia referência e ideia", detail: "Tamanho, região do corpo e estilo desejado." },
  { id: 3, title: "Recebe orçamento", detail: "Faixa de investimento e previsão de sessão." },
  { id: 4, title: "Faz sinal", detail: "Reserva da data com 30% do valor total." },
  { id: 5, title: "Agenda data", detail: "Confirmação do horário no estúdio." },
  { id: 6, title: "Realiza sessão", detail: "Procedimento com materiais descartáveis e assepsia." },
  { id: 7, title: "Recebe cuidados pós", detail: "Orientação completa para cicatrização segura." }
];
