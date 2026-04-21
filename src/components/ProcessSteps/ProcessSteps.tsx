import styles from "./ProcessSteps.module.css";
import { processSteps } from "@/data/process";

export function ProcessSteps() {
  return (
    <section className={styles.section} aria-labelledby="process-title">
      <div>
        <span className="eyebrow">Processo de atendimento</span>
        <h2 id="process-title" className={styles.title}>
          Como funciona do briefing ao pós
        </h2>
      </div>

      <ol className={styles.list}>
        {processSteps.map((step) => (
          <li key={step.id} className={styles.item}>
            <span className={styles.index}>{String(step.id).padStart(2, "0")}</span>
            <div className={styles.content}>
              <p>{step.title}</p>
              <small>{step.detail}</small>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
