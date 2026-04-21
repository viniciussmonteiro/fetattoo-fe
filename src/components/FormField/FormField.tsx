import type { ReactNode } from "react";
import styles from "./FormField.module.css";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, hint, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}
