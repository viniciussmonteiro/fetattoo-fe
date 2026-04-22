"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendTattoo, BackendTattooCategory } from "@/types/backend";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import styles from "../../admin.module.css";

type FormState = {
  title: string;
  categoryId: string;
  style: string;
  bodyPart: string;
  technique: string;
  description: string;
  healed: boolean;
  fresh: boolean;
  beforeAfter: boolean;
  featuredHome: boolean;
  published: boolean;
  workDate: string;
};

function toIsoIfValid(dateTimeLocalValue: string): string | null {
  if (!dateTimeLocalValue) return null;

  const parsed = new Date(dateTimeLocalValue);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toISOString();
}

const INITIAL_FORM: FormState = {
  title: "",
  categoryId: "",
  style: "",
  bodyPart: "",
  technique: "",
  description: "",
  healed: false,
  fresh: false,
  beforeAfter: false,
  featuredHome: false,
  published: true,
  workDate: ""
};

export function AdminPortfolioNewClient() {
  const router = useRouter();
  const [categories, setCategories] = useState<BackendTattooCategory[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadCategories() {
      setIsLoading(true);
      const response = await requestApi<BackendTattooCategory[]>("/api/admin/tattoo-categories");

      if (!isApiSuccess(response)) {
        setFeedback({ type: "error", message: response.error.message || "Não foi possível carregar categorias." });
        setIsLoading(false);
        return;
      }

      setCategories(response.data);
      setForm((current) => ({
        ...current,
        categoryId: response.data[0] ? String(response.data[0].id) : ""
      }));
      setIsLoading(false);
    }

    loadCategories();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    const workDateIso = toIsoIfValid(form.workDate);

    if (form.workDate && !workDateIso) {
      setIsSaving(false);
      setFeedback({ type: "error", message: "Data do trabalho inválida. Ajuste o campo e tente novamente." });
      return;
    }

    const response = await requestApi<BackendTattoo>("/api/admin/tattoos", {
      method: "POST",
      body: {
        title: form.title,
        categoryId: Number(form.categoryId),
        style: form.style,
        bodyPart: form.bodyPart,
        technique: form.technique,
        description: form.description || undefined,
        healed: form.healed,
        fresh: form.fresh,
        beforeAfter: form.beforeAfter,
        featuredHome: form.featuredHome,
        published: form.published,
        ...(workDateIso ? { workDate: workDateIso } : {})
      }
    });

    setIsSaving(false);

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao criar item de portfólio." });
      return;
    }

    setFeedback({ type: "success", message: "Item criado com sucesso." });
    router.push(`/admin/portfolio/${response.data.id}`);
  }

  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Carregando formulário...
      </div>
    );
  }

  return (
    <AdminForm title="Novo item de portfólio" description="Crie uma nova tatuagem no catálogo do admin.">
      <form onSubmit={handleSubmit} className="flow">
        <FormField label="Título" htmlFor="title">
          <input id="title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
        </FormField>
        <FormField label="Categoria" htmlFor="categoryId">
          <select
            id="categoryId"
            value={form.categoryId}
            onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Estilo" htmlFor="style">
          <input id="style" value={form.style} onChange={(event) => setForm((current) => ({ ...current, style: event.target.value }))} required />
        </FormField>
        <FormField label="Região do corpo" htmlFor="bodyPart">
          <input
            id="bodyPart"
            value={form.bodyPart}
            onChange={(event) => setForm((current) => ({ ...current, bodyPart: event.target.value }))}
            required
          />
        </FormField>
        <FormField label="Técnica" htmlFor="technique">
          <input
            id="technique"
            value={form.technique}
            onChange={(event) => setForm((current) => ({ ...current, technique: event.target.value }))}
            required
          />
        </FormField>
        <FormField label="Descrição (opcional)" htmlFor="description">
          <textarea
            id="description"
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
          />
        </FormField>
        <FormField label="Data do trabalho (opcional)" htmlFor="workDate">
          <input
            id="workDate"
            type="datetime-local"
            value={form.workDate}
            onChange={(event) => setForm((current) => ({ ...current, workDate: event.target.value }))}
          />
        </FormField>

        <FormField label="Publicado?" htmlFor="published">
          <select
            id="published"
            value={form.published ? "true" : "false"}
            onChange={(event) => setForm((current) => ({ ...current, published: event.target.value === "true" }))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Destaque na home?" htmlFor="featuredHome">
          <select
            id="featuredHome"
            value={form.featuredHome ? "true" : "false"}
            onChange={(event) => setForm((current) => ({ ...current, featuredHome: event.target.value === "true" }))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Cicatrizada?" htmlFor="healed">
          <select
            id="healed"
            value={form.healed ? "true" : "false"}
            onChange={(event) => setForm((current) => ({ ...current, healed: event.target.value === "true" }))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Recém-feita?" htmlFor="fresh">
          <select
            id="fresh"
            value={form.fresh ? "true" : "false"}
            onChange={(event) => setForm((current) => ({ ...current, fresh: event.target.value === "true" }))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Antes/Depois?" htmlFor="beforeAfter">
          <select
            id="beforeAfter"
            value={form.beforeAfter ? "true" : "false"}
            onChange={(event) => setForm((current) => ({ ...current, beforeAfter: event.target.value === "true" }))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>

        <button type="submit" className="chip" disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar item"}
        </button>
      </form>

      {feedback ? (
        <p className={feedback.type === "error" ? styles.error : styles.success} role={feedback.type === "error" ? "alert" : "status"}>
          {feedback.message}
        </p>
      ) : null}
    </AdminForm>
  );
}
