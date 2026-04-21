import styles from "./ServiceSection.module.css";

const doesItems = [
  "Fine line, blackwork e floral autoral",
  "Tatuagem personalizada baseada em briefing",
  "Flash day com seleção mensal",
  "Projetos autorais de média e grande escala",
  "Cover-up mediante avaliação da peça anterior"
];

const doesntItems = [
  "Cópia exata de tatuagem de outro artista",
  "Projetos fora da linha estética acordada",
  "Atendimento sem consulta prévia de viabilidade"
];

type ServiceSectionProps = {
  title?: string;
};

export function ServiceSection({ title = "Serviços e estilos atendidos" }: ServiceSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div>
        <span className="eyebrow">Alinhamento de expectativas</span>
        <h2 id="services-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>
          A proposta é filtrar os clientes certos para cada projeto, garantindo qualidade artística e uma experiência fluida.
        </p>
      </div>

      <div className={styles.columns}>
        <article className={styles.card}>
          <h3>O que faço</h3>
          <ul>
            {doesItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h3>O que não faço</h3>
          <ul>
            {doesntItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
