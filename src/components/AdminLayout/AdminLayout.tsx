import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/AdminSidebar/AdminSidebar";
import { AdminTopbar } from "@/components/AdminTopbar/AdminTopbar";
import styles from "./AdminLayout.module.css";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

export function AdminLayout({
  children,
  title = "Painel administrativo",
  subtitle = "Gestão de conteúdo e configurações"
}: AdminLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <div className={styles.mainArea}>
        <AdminTopbar title={title} subtitle={subtitle} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
