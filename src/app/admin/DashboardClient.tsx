"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendAdminDashboard } from "@/types/backend";
import styles from "./admin.module.css";

export function DashboardClient() {
  const [data, setData] = useState<BackendAdminDashboard | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSummary() {
      setIsLoading(true);
      setError("");
      const response = await requestApi<BackendAdminDashboard>("/api/admin/dashboard");

      if (!isMounted) return;

      if (!isApiSuccess(response)) {
        setError(response.error.message || "Não foi possível carregar os dados do dashboard.");
        setData(null);
        setIsLoading(false);
        return;
      }

      setData(response.data);
      setIsLoading(false);
    }

    loadSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Carregando indicadores do painel...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.status} role="alert">
        <p className={styles.error}>{error || "Falha ao carregar dashboard."}</p>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <section className={styles.grid} aria-label="Indicadores do painel">
        <DashboardCard label="Tatuagens cadastradas" value={String(data.totalTattoos)} hint="Entre publicadas e rascunhos" />
        <DashboardCard label="Perguntas no FAQ" value={String(data.totalFaqItems)} hint="Conteúdo de atendimento" />
        <DashboardCard label="Depoimentos" value={String(data.totalTestimonials)} hint="Prova social ativa" />
        <DashboardCard label="Mensagens recebidas" value={String(data.totalContactMessages)} hint="Entradas de contato" />
      </section>

      <section className={styles.card}>
        <h2>Ações rápidas</h2>
        <div className={styles.actions}>
          <Link href="/admin/portfolio/novo" className={styles.actionLink}>
            Novo item de portfólio
          </Link>
          <Link href="/admin/faq" className={styles.actionLink}>
            Editar FAQ
          </Link>
          <Link href="/admin/bio" className={styles.actionLink}>
            Atualizar bio
          </Link>
          <Link href="/admin/redes-sociais" className={styles.actionLink}>
            Gerenciar redes sociais
          </Link>
        </div>
      </section>
    </div>
  );
}

