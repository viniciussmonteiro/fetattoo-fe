import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  ariaLabel?: string;
  target?: "_self" | "_blank";
  rel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  fullWidth = false,
  ariaLabel,
  target,
  rel
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ""}`.trim();

  return (
    <Link href={href} className={className} aria-label={ariaLabel} target={target} rel={rel}>
      {children}
    </Link>
  );
}
