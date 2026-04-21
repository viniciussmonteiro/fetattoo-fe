export type CareBlock = {
  id: string;
  title: string;
  items: string[];
};

export const careBlocks: CareBlock[] = [
  {
    id: "higiene",
    title: "Higiene e assepsia",
    items: [
      "Materiais descartáveis de uso único",
      "Bancadas e superfícies esterilizadas entre sessões",
      "Uso de barreiras de proteção e EPIs",
      "Fluxo planejado para evitar contaminação cruzada"
    ]
  },
  {
    id: "equipamentos",
    title: "Tintas e equipamentos",
    items: [
      "Tintas profissionais regularizadas",
      "Máquinas e fontes revisadas periodicamente",
      "Agulhas e biqueiras abertas na frente da cliente",
      "Descarte correto de resíduos perfurocortantes"
    ]
  },
  {
    id: "preparo",
    title: "Preparação pré-sessão",
    items: [
      "Durma bem na noite anterior",
      "Alimente-se antes da sessão",
      "Evite álcool por pelo menos 24h",
      "Leve roupa confortável para facilitar acesso à área"
    ]
  },
  {
    id: "pos",
    title: "Cuidados pós-procedimento",
    items: [
      "Higienize com sabonete neutro e água corrente",
      "Aplique pomada orientada em camada fina",
      "Evite sol, piscina e mar no período de cicatrização",
      "Não coçar, não arrancar casquinhas e manter a pele hidratada"
    ]
  }
];

export const bookingPolicy =
  "O agendamento é confirmado mediante sinal de 30%. Reagendamentos devem ser solicitados com antecedência mínima de 48h para remarcação sem perda do sinal.";
