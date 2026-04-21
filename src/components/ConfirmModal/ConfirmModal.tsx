import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  title: string;
  description: string;
};

export function ConfirmModal({ title, description }: ConfirmModalProps) {
  return (
    <div className={styles.preview} role="dialog" aria-label={title} aria-modal="false">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.actions}>
        <button type="button">Cancelar</button>
        <button type="button">Confirmar</button>
      </div>
      <small>Componente pronto para controle real via estado global/local.</small>
    </div>
  );
}
