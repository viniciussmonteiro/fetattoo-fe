import type { ReactNode } from "react";
import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  className?: string;
  actions?: ReactNode;
};

export function SectionTitle({ eyebrow, title, description, id, className, actions }: SectionTitleProps) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 id={id} className="sectionTitle">
        {title}
      </h2>
      {description ? <p className="sectionLead">{description}</p> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
