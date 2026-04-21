import type { ReactNode } from "react";
import styles from "./AdminForm.module.css";

type AdminFormProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AdminForm({ title, description, children }: AdminFormProps) {
  return (
    <section className={styles.formWrap} aria-label={title}>
      <header className={styles.header}>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <form className={styles.form} action="#" method="post">
        {children}
      </form>
    </section>
  );
}
