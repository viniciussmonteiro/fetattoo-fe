"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestApi } from "@/lib/api/client";
import styles from "./AdminTopbar.module.css";

type AdminTopbarProps = {
  title: string;
  subtitle?: string;
  userEmail: string;
};

export function AdminTopbar({ title, subtitle, userEmail }: AdminTopbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await requestApi<{ loggedOut: true }>("/api/auth/logout", {
        method: "POST"
      });

      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <header className={styles.topbar}>
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <button
        className={styles.userButton}
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        aria-label={`Sair da sessão (${userEmail})`}
      >
        {isPending ? "Saindo..." : `${userEmail} • Sair`}
      </button>
    </header>
  );
}
