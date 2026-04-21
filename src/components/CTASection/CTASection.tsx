import styles from "./CTASection.module.css";
import { Button } from "@/components/Button/Button";

type CTASectionProps = {
  title: string;
  description: string;
};

export function CTASection({ title, description }: CTASectionProps) {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div>
        <h2 id="cta-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <Button href="/contato" variant="primary">
          Agendar sessão
        </Button>
        <Button href="/portfolio" variant="secondary">
          Ver trabalhos
        </Button>
      </div>
    </section>
  );
}
