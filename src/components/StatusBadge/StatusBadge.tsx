import styles from "./StatusBadge.module.css";

type StatusType = "published" | "draft" | "archived";

type StatusBadgeProps = {
  status: StatusType;
};

const labels: Record<StatusType, string> = {
  published: "Publicado",
  draft: "Rascunho",
  archived: "Arquivado"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`${styles.badge} ${styles[status]}`.trim()}>{labels[status]}</span>;
}
