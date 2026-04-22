"use client";

import { FormEvent, useEffect, useState } from "react";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendSocialLink } from "@/types/backend";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import styles from "../admin.module.css";

const DEFAULT_NEW_LINK = {
  platform: "",
  url: "",
  username: "",
  sortOrder: 0,
  isActive: true
};

export function AdminSocialLinksClient() {
  const [items, setItems] = useState<BackendSocialLink[]>([]);
  const [newLink, setNewLink] = useState(DEFAULT_NEW_LINK);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const response = await requestApi<BackendSocialLink[]>("/api/admin/social-links");

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao carregar redes sociais." });
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

    const response = await requestApi<BackendSocialLink>("/api/admin/social-links", {
      method: "POST",
      body: {
        platform: newLink.platform.trim().toLowerCase(),
        url: newLink.url.trim(),
        username: newLink.username.trim() || undefined,
        sortOrder: Number(newLink.sortOrder),
        isActive: newLink.isActive
      }
    });

    setIsSaving(false);

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao criar rede social." });
      return;
    }

    setFeedback({ type: "success", message: "Rede social adicionada com sucesso." });
    setNewLink(DEFAULT_NEW_LINK);
    await loadItems();
  }

  async function handleUpdate(item: BackendSocialLink) {
    setFeedback(null);
    const response = await requestApi<BackendSocialLink>(`/api/admin/social-links/${item.id}`, {
      method: "PUT",
      body: {
        platform: item.platform,
        url: item.url,
        username: item.username,
        sortOrder: item.sortOrder,
        isActive: item.isActive
      }
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao atualizar rede social." });
      return;
    }

    setFeedback({ type: "success", message: "Rede social atualizada." });
    await loadItems();
  }

  async function handleDelete(id: number) {
    setFeedback(null);
    const response = await requestApi<{ id: number }>(`/api/admin/social-links/${id}`, {
      method: "DELETE"
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao remover rede social." });
      return;
    }

    setFeedback({ type: "success", message: "Rede social removida." });
    await loadItems();
  }

  const rows = items.map((link) => [
    link.platform,
    link.url,
    String(link.sortOrder),
    link.isActive ? "Ativo" : "Inativo",
    <div key={link.id} className={styles.inlineActions}>
      <button type="button" className={styles.smallButton} onClick={() => handleUpdate(link)}>
        Salvar
      </button>
      <button type="button" className={styles.dangerButton} onClick={() => handleDelete(link.id)}>
        Remover
      </button>
    </div>
  ]);

  return (
    <div className="flow">
      {isLoading ? (
        <div className={styles.status} role="status">
          Carregando redes sociais...
        </div>
      ) : (
        <>
          <AdminTable caption="Links atuais" headers={["Plataforma", "URL", "Ordem", "Status", "Ações"]} rows={rows} />

          <div className="flow">
            {items.map((link, index) => (
              <AdminForm key={link.id} title={`Editar #${link.id}`} description="Atualize link, ordem ou status.">
                <div className="flow">
                  <FormField label="Plataforma" htmlFor={`platform-${link.id}`}>
                    <input
                      id={`platform-${link.id}`}
                      value={link.platform}
                      onChange={(event) =>
                        setItems((current) =>
                          current.map((entry, itemIndex) =>
                            itemIndex === index ? { ...entry, platform: event.target.value } : entry
                          )
                        )
                      }
                    />
                  </FormField>
                  <FormField label="URL" htmlFor={`url-${link.id}`}>
                    <input
                      id={`url-${link.id}`}
                      type="url"
                      value={link.url}
                      onChange={(event) =>
                        setItems((current) =>
                          current.map((entry, itemIndex) => (itemIndex === index ? { ...entry, url: event.target.value } : entry))
                        )
                      }
                    />
                  </FormField>
                  <FormField label="Username" htmlFor={`username-${link.id}`}>
                    <input
                      id={`username-${link.id}`}
                      value={link.username ?? ""}
                      onChange={(event) =>
                        setItems((current) =>
                          current.map((entry, itemIndex) =>
                            itemIndex === index ? { ...entry, username: event.target.value || null } : entry
                          )
                        )
                      }
                    />
                  </FormField>
                  <FormField label="Ordem" htmlFor={`order-${link.id}`}>
                    <input
                      id={`order-${link.id}`}
                      type="number"
                      value={link.sortOrder}
                      onChange={(event) =>
                        setItems((current) =>
                          current.map((entry, itemIndex) =>
                            itemIndex === index ? { ...entry, sortOrder: Number(event.target.value) } : entry
                          )
                        )
                      }
                    />
                  </FormField>
                  <FormField label="Status" htmlFor={`active-${link.id}`}>
                    <select
                      id={`active-${link.id}`}
                      value={link.isActive ? "true" : "false"}
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
          </div>
        </>
      )}

      <AdminForm title="Adicionar rede social" description="Cadastre um novo canal oficial.">
        <form onSubmit={handleCreate} className="flow">
          <FormField label="Plataforma" htmlFor="new-platform">
            <input
              id="new-platform"
              value={newLink.platform}
              onChange={(event) => setNewLink((current) => ({ ...current, platform: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="URL" htmlFor="new-url">
            <input
              id="new-url"
              type="url"
              value={newLink.url}
              onChange={(event) => setNewLink((current) => ({ ...current, url: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Username (opcional)" htmlFor="new-username">
            <input
              id="new-username"
              value={newLink.username}
              onChange={(event) => setNewLink((current) => ({ ...current, username: event.target.value }))}
            />
          </FormField>
          <FormField label="Ordem" htmlFor="new-sort-order">
            <input
              id="new-sort-order"
              type="number"
              value={newLink.sortOrder}
              onChange={(event) => setNewLink((current) => ({ ...current, sortOrder: Number(event.target.value) }))}
              required
            />
          </FormField>
          <FormField label="Status" htmlFor="new-status">
            <select
              id="new-status"
              value={newLink.isActive ? "true" : "false"}
              onChange={(event) => setNewLink((current) => ({ ...current, isActive: event.target.value === "true" }))}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </FormField>

          <button type="submit" className="chip" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Adicionar rede"}
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

