import styles from "./cuidados.module.css";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cuidados e Políticas",
  description:
    "Informações de higiene, materiais, preparo pré-sessão, cuidados pós-tatuagem e políticas de agendamento da Ana Noir Tattoo.",
  path: "/cuidados"
});

export default function CuidadosPage() {
  return (
    <>
      <section className="pageIntro">
        <div className={`container ${styles.intro}`}>
          <span className="eyebrow">Cuidados, higiene e segurança</span>
          <h1 className="sectionTitle">Compromisso com técnica segura e atendimento responsável</h1>
          <p className="sectionLead">
            Processo estruturado para garantir segurança do procedimento, boa cicatrização e experiência profissional do início ao fim.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <article className={styles.card}>
            <h2>Higiene e assepsia</h2>
            <ul>
              <li>Materiais descartáveis de uso único</li>
              <li>Bancadas e superfícies esterilizadas entre sessões</li>
              <li>Uso de barreiras de proteção e EPIs</li>
              <li>Organização do fluxo para evitar contaminação cruzada</li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2>Tintas e equipamentos</h2>
            <ul>
              <li>Tintas profissionais regularizadas</li>
              <li>Máquinas e fontes revisadas periodicamente</li>
              <li>Agulhas e biqueiras abertas na frente da cliente</li>
              <li>Descarte correto de resíduos perfurocortantes</li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2>Preparação pré-sessão</h2>
            <ul>
              <li>Durma bem na noite anterior</li>
              <li>Alimente-se antes da sessão</li>
              <li>Evite álcool por pelo menos 24h</li>
              <li>Leve roupa confortável para facilitar acesso à área</li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2>Cuidados pós-procedimento</h2>
            <ul>
              <li>Higienize com sabonete neutro e água corrente</li>
              <li>Aplique pomada orientada em camada fina</li>
              <li>Evite sol, piscina e mar no período de cicatrização</li>
              <li>Não coçar, não arrancar casquinhas e manter a pele hidratada</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.policy}`}>
          <h2>Políticas de agendamento e sinal</h2>
          <p>
            O agendamento é confirmado mediante sinal de 30%. O valor é abatido no dia da sessão. Reagendamentos devem ser
            solicitados com antecedência mínima de 48h para remarcação sem perda do sinal.
          </p>
        </div>
      </section>
    </>
  );
}
