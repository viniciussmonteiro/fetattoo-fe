import styles from "./ProcessSteps.module.css";

const steps = [
  "Cliente entra em contato",
  "Envia referência e ideia",
  "Recebe orçamento",
  "Faz sinal",
  "Agenda data",
  "Realiza sessão",
  "Recebe cuidados pós-tatuagem"
];

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
        {steps.map((step, index) => (
          <li key={step} className={styles.item}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
