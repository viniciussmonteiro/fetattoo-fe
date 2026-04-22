"use client";

import { FormEvent, useEffect, useState } from "react";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendFaqItem } from "@/types/backend";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import styles from "../admin.module.css";

const EMPTY_ITEM = {
  question: "",
  answer: "",
  sortOrder: 0,
  isActive: true
};

export function AdminFaqClient() {
  const [items, setItems] = useState<BackendFaqItem[]>([]);
  const [newItem, setNewItem] = useState(EMPTY_ITEM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const response = await requestApi<BackendFaqItem[]>("/api/admin/faq");

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Não foi possível carregar o FAQ." });
      setIsLoading(false);
      return;
    }

    setItems(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const response = await requestApi<BackendFaqItem>("/api/admin/faq", {
      method: "POST",
      body: {
        question: newItem.question,
        answer: newItem.answer,
        sortOrder: Number(newItem.sortOrder),
        isActive: newItem.isActive
      }
    });

    setIsSaving(false);

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao criar item de FAQ." });
      return;
    }

    setNewItem(EMPTY_ITEM);
    setFeedback({ type: "success", message: "Item de FAQ criado." });
    await loadItems();
  }

  async function handleUpdate(item: BackendFaqItem) {
    const response = await requestApi<BackendFaqItem>(`/api/admin/faq/${item.id}`, {
      method: "PUT",
      body: {
        question: item.question,
        answer: item.answer,
        sortOrder: item.sortOrder,
        isActive: item.isActive
      }
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao atualizar item de FAQ." });
      return;
    }

    setFeedback({ type: "success", message: "FAQ atualizado." });
    await loadItems();
  }

  async function handleDelete(id: number) {
    const response = await requestApi<{ id: number }>(`/api/admin/faq/${id}`, {
      method: "DELETE"
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao remover item de FAQ." });
      return;
    }

    setFeedback({ type: "success", message: "FAQ removido." });
    await loadItems();
  }

  const rows = items.map((item) => [
    item.question,
    item.answer,
    String(item.sortOrder),
    item.isActive ? "Ativo" : "Inativo",
    <div key={item.id} className={styles.inlineActions}>
      <button type="button" className={styles.smallButton} onClick={() => handleUpdate(item)}>
        Salvar
      </button>
      <button type="button" className={styles.dangerButton} onClick={() => handleDelete(item.id)}>
        Remover
      </button>
    </div>
  ]);

  return (
    <div className="flow">
      {isLoading ? (
        <div className={styles.status} role="status">
          Carregando FAQ...
        </div>
      ) : (
        <>
          <AdminTable caption="Perguntas cadastradas" headers={["Pergunta", "Resposta", "Ordem", "Status", "Ações"]} rows={rows} />

          {items.map((item, index) => (
            <AdminForm key={item.id} title={`Editar FAQ #${item.id}`}>
              <div className="flow">
                <FormField label="Pergunta" htmlFor={`question-${item.id}`}>
                  <input
                    id={`question-${item.id}`}
                    value={item.question}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) => (itemIndex === index ? { ...entry, question: event.target.value } : entry))
                      )
                    }
                  />
                </FormField>
                <FormField label="Resposta" htmlFor={`answer-${item.id}`}>
                  <textarea
                    id={`answer-${item.id}`}
                    value={item.answer}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) => (itemIndex === index ? { ...entry, answer: event.target.value } : entry))
                      )
                    }
                  />
                </FormField>
                <FormField label="Ordem" htmlFor={`sort-${item.id}`}>
                  <input
                    id={`sort-${item.id}`}
                    type="number"
                    value={item.sortOrder}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) =>
                          itemIndex === index ? { ...entry, sortOrder: Number(event.target.value) } : entry
                        )
                      )
                    }
                  />
                </FormField>
                <FormField label="Status" htmlFor={`active-${item.id}`}>
                  <select
                    id={`active-${item.id}`}
                    value={item.isActive ? "true" : "false"}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) =>
                          itemIndex === index ? { ...entry, isActive: event.target.value === "true" } : entry
                        )
                      )
                    }
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </FormField>
              </div>
            </AdminForm>
          ))}
        </>
      )}

      <AdminForm title="Novo item de FAQ" description="Adicione uma nova pergunta ao conteúdo institucional.">
        <form onSubmit={handleCreate} className="flow">
          <FormField label="Pergunta" htmlFor="new-question">
            <input
              id="new-question"
              value={newItem.question}
              onChange={(event) => setNewItem((current) => ({ ...current, question: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Resposta" htmlFor="new-answer">
            <textarea
              id="new-answer"
              value={newItem.answer}
              onChange={(event) => setNewItem((current) => ({ ...current, answer: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Ordem" htmlFor="new-order">
            <input
              id="new-order"
              type="number"
              value={newItem.sortOrder}
              onChange={(event) => setNewItem((current) => ({ ...current, sortOrder: Number(event.target.value) }))}
              required
            />
          </FormField>
          <button type="submit" className="chip" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Adicionar pergunta"}
          </button>
        </form>
      </AdminForm>

      {feedback ? (
        <p className={feedback.type === "error" ? styles.error : styles.success} role={feedback.type === "error" ? "alert" : "status"}>
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

