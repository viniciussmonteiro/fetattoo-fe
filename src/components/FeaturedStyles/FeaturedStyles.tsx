import styles from "./FeaturedStyles.module.css";
import { serviceHighlights } from "@/data/services";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";

export function FeaturedStyles() {
  return (
    <section className="section" aria-labelledby="featured-styles-title">
      <div className="container flow">
        <SectionTitle
          id="featured-styles-title"
          eyebrow="Estilos principais"
          title="Especialidades com assinatura artística"
          description="Cada estilo recebe abordagem técnica específica para garantir resultado elegante e duradouro."
        />

        <div className={styles.grid}>
          {serviceHighlights.map((style) => (
            <article key={style.title} className={styles.card}>
              <h3>{style.title}</h3>
              <p>{style.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
