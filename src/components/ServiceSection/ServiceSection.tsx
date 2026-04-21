import styles from "./ServiceSection.module.css";
import { servicesOffered, servicesNotOffered } from "@/data/services";

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
            {servicesOffered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h3>O que não faço</h3>
          <ul>
            {servicesNotOffered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
