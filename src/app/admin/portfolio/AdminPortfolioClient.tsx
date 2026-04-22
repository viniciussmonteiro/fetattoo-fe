"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendTattoo } from "@/types/backend";
import styles from "../admin.module.css";

export function AdminPortfolioClient() {
  const [items, setItems] = useState<BackendTattoo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const response = await requestApi<BackendTattoo[]>("/api/admin/tattoos");

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao carregar tatuagens." });
      setIsLoading(false);
      return;
    }

    setItems(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleDelete(id: number) {
    const response = await requestApi<{ id: number }>(`/api/admin/tattoos/${id}`, {
      method: "DELETE"
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao remover tatuagem." });
      return;
    }

    setFeedback({ type: "success", message: "Item removido do portfólio." });
    await loadItems();
  }

  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Carregando portfólio...
      </div>
    );
  }

  const rows = items.map((item) => [
    item.title,
    item.category?.name ?? String(item.categoryId),
    item.bodyPart,
    <StatusBadge key={`status-${item.id}`} status={item.published ? "published" : "draft"} />,
    <div key={`actions-${item.id}`} className={styles.inlineActions}>
      <Link href={`/admin/portfolio/${item.id}`} className={styles.smallButton}>
        Editar
      </Link>
      <button type="button" className={styles.dangerButton} onClick={() => handleDelete(item.id)}>
        Remover
      </button>
    </div>
  ]);

  return (
    <div className="flow">
      <Link href="/admin/portfolio/novo" className="chip">
        + Novo item
      </Link>
      <AdminTable
        caption="Lista de tatuagens cadastradas"
        headers={["Título", "Categoria", "Região", "Status", "Ações"]}
        rows={rows}
      />

      {feedback ? (
        <p className={feedback.type === "error" ? styles.error : styles.success} role={feedback.type === "error" ? "alert" : "status"}>
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

