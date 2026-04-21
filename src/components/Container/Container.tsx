import type { ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section";
  className?: string;
};

export function Container({ children, as: Component = "div", className }: ContainerProps) {
  return <Component className={`${styles.container} ${className ?? ""}`.trim()}>{children}</Component>;
}
