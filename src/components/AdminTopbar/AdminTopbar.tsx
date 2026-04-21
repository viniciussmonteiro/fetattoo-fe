import styles from "./AdminTopbar.module.css";

type AdminTopbarProps = {
  title: string;
  subtitle?: string;
};

export function AdminTopbar({ title, subtitle }: AdminTopbarProps) {
  return (
    <header className={styles.topbar}>
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <button className={styles.userButton} type="button" aria-label="Usuário autenticado (mock)">
        admin@studio
      </button>
    </header>
  );
}
