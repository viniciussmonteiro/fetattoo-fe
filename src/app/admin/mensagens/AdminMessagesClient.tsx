"use client";

import { useEffect, useState } from "react";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendContactMessage } from "@/types/backend";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import styles from "../admin.module.css";

const STATUS_OPTIONS: BackendContactMessage["status"][] = ["NEW", "READ", "REPLIED", "ARCHIVED"];

export function AdminMessagesClient() {
  const [items, setItems] = useState<BackendContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const response = await requestApi<BackendContactMessage[]>("/api/admin/contact-messages");

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao carregar mensagens." });
      setIsLoading(false);
      return;
    }

    setItems(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function updateStatus(id: number, status: BackendContactMessage["status"]) {
    const response = await requestApi<BackendContactMessage>(`/api/admin/contact-messages/${id}/status`, {
      method: "PUT",
      body: { status }
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao atualizar status da mensagem." });
      return;
    }

    setFeedback({ type: "success", message: "Status atualizado." });
    await loadItems();
  }

  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Carregando mensagens...
      </div>
    );
  }

  const rows = items.map((message) => [
    `${message.name} (${message.email})`,
    message.desiredStyle ?? "-",
    message.message,
    message.status,
    new Date(message.createdAt).toLocaleString("pt-BR"),
    <select
      key={`status-${message.id}`}
      value={message.status}
      onChange={(event) => updateStatus(message.id, event.target.value as BackendContactMessage["status"])}
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  ]);

  return (
    <div className="flow">
      <AdminTable
        caption="Mensagens recebidas"
        headers={["Contato", "Estilo desejado", "Mensagem", "Status", "Recebida em", "Atualizar status"]}
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

