"use client";

import { FormEvent, useEffect, useState } from "react";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendTestimonial } from "@/types/backend";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { FormField } from "@/components/FormField/FormField";
import styles from "../admin.module.css";

const EMPTY_TESTIMONIAL = {
  clientName: "",
  testimonial: "",
  source: "",
  sortOrder: 0,
  isFeatured: false,
  isActive: true
};

export function AdminTestimonialsClient() {
  const [items, setItems] = useState<BackendTestimonial[]>([]);
  const [newItem, setNewItem] = useState(EMPTY_TESTIMONIAL);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const response = await requestApi<BackendTestimonial[]>("/api/admin/testimonials");

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Não foi possível carregar depoimentos." });
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

    const response = await requestApi<BackendTestimonial>("/api/admin/testimonials", {
      method: "POST",
      body: {
        clientName: newItem.clientName,
        testimonial: newItem.testimonial,
        source: newItem.source || undefined,
        sortOrder: Number(newItem.sortOrder),
        isFeatured: newItem.isFeatured,
        isActive: newItem.isActive
      }
    });

    setIsSaving(false);

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao criar depoimento." });
      return;
    }

    setFeedback({ type: "success", message: "Depoimento criado com sucesso." });
    setNewItem(EMPTY_TESTIMONIAL);
    await loadItems();
  }

  async function handleUpdate(item: BackendTestimonial) {
    const response = await requestApi<BackendTestimonial>(`/api/admin/testimonials/${item.id}`, {
      method: "PUT",
      body: {
        clientName: item.clientName,
        testimonial: item.testimonial,
        source: item.source,
        sortOrder: item.sortOrder,
        isFeatured: item.isFeatured,
        isActive: item.isActive
      }
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao atualizar depoimento." });
      return;
    }

    setFeedback({ type: "success", message: "Depoimento atualizado." });
    await loadItems();
  }

  async function handleDelete(id: number) {
    const response = await requestApi<{ id: number }>(`/api/admin/testimonials/${id}`, {
      method: "DELETE"
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao remover depoimento." });
      return;
    }

    setFeedback({ type: "success", message: "Depoimento removido." });
    await loadItems();
  }

  const rows = items.map((item) => [
    item.clientName,
    item.testimonial,
    item.source ?? "-",
    item.isFeatured ? "Destaque" : "Normal",
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
          Carregando depoimentos...
        </div>
      ) : (
        <>
          <AdminTable
            caption="Depoimentos ativos"
            headers={["Cliente", "Comentário", "Origem", "Destaque", "Status", "Ações"]}
            rows={rows}
          />

          {items.map((item, index) => (
            <AdminForm key={item.id} title={`Editar depoimento #${item.id}`}>
              <div className="flow">
                <FormField label="Nome" htmlFor={`name-${item.id}`}>
                  <input
                    id={`name-${item.id}`}
                    value={item.clientName}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) => (itemIndex === index ? { ...entry, clientName: event.target.value } : entry))
                      )
                    }
                  />
                </FormField>
                <FormField label="Comentário" htmlFor={`comment-${item.id}`}>
                  <textarea
                    id={`comment-${item.id}`}
                    value={item.testimonial}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) =>
                          itemIndex === index ? { ...entry, testimonial: event.target.value } : entry
                        )
                      )
                    }
                  />
                </FormField>
                <FormField label="Origem" htmlFor={`source-${item.id}`}>
                  <input
                    id={`source-${item.id}`}
                    value={item.source ?? ""}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) => (itemIndex === index ? { ...entry, source: event.target.value } : entry))
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
                <FormField label="Destaque" htmlFor={`featured-${item.id}`}>
                  <select
                    id={`featured-${item.id}`}
                    value={item.isFeatured ? "true" : "false"}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, itemIndex) =>
                          itemIndex === index ? { ...entry, isFeatured: event.target.value === "true" } : entry
                        )
                      )
                    }
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
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

      <AdminForm title="Novo depoimento" description="Cadastre uma nova avaliação autorizada.">
        <form onSubmit={handleCreate} className="flow">
          <FormField label="Nome" htmlFor="new-name">
            <input
              id="new-name"
              value={newItem.clientName}
              onChange={(event) => setNewItem((current) => ({ ...current, clientName: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Comentário" htmlFor="new-comment">
            <textarea
              id="new-comment"
              value={newItem.testimonial}
              onChange={(event) => setNewItem((current) => ({ ...current, testimonial: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Origem" htmlFor="new-source">
            <input
              id="new-source"
              value={newItem.source}
              onChange={(event) => setNewItem((current) => ({ ...current, source: event.target.value }))}
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
            {isSaving ? "Salvando..." : "Salvar depoimento"}
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

