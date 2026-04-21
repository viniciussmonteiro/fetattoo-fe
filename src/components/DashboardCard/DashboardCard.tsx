import type { ReactNode } from "react";
import styles from "./DashboardCard.module.css";

type DashboardCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
};

export function DashboardCard({ label, value, hint, icon }: DashboardCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span>{label}</span>
        {icon ? <span aria-hidden>{icon}</span> : null}
      </div>
      <p className={styles.value}>{value}</p>
      {hint ? <small className={styles.hint}>{hint}</small> : null}
    </article>
  );
}
