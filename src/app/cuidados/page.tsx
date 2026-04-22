import styles from "./cuidados.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { getBookingPolicy, getCareBlocks } from "@/lib/repositories/content-repository";

export const metadata = createPageMetadata({
  title: "Cuidados e Políticas",
  description:
    "Informações de higiene, preparo e cuidados pós-tatuagem no atendimento da Fernanda Borges em Pinheiros, SP.",
  path: "/cuidados"
});

export default async function CuidadosPage() {
  const [careBlocks, bookingPolicy] = await Promise.all([getCareBlocks(), getBookingPolicy()]);

  return (
    <>
      <section className="pageIntro">
        <div className={`container ${styles.intro}`}>
          <span className="eyebrow">Cuidados, higiene e segurança</span>
          <h1 className="sectionTitle">Compromisso com técnica segura e atendimento responsável</h1>
          <p className="sectionLead">
            Processo estruturado para garantir segurança do procedimento, boa cicatrização e experiência profissional do início ao
            fim.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          {careBlocks.map((block) => (
            <article key={block.id} className={styles.card}>
              <h2>{block.title}</h2>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.policy}`}>
          <h2>Políticas de agendamento e sinal</h2>
          <p>{bookingPolicy}</p>
        </div>
      </section>
    </>
  );
}
