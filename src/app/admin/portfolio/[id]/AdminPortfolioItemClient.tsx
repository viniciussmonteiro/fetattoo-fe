"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendTattoo, BackendTattooCategory, BackendTattooImage } from "@/types/backend";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import styles from "../../admin.module.css";

type AdminPortfolioItemClientProps = {
  id: string;
};

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

type ImageFormState = {
  imageUrl: string;
  altText: string;
  caption: string;
  isCover: boolean;
  sortOrder: string;
  file: File | null;
};

type UploadedImageResult = {
  imageUrl: string;
  storagePath: string;
};

const INITIAL_IMAGE_FORM: ImageFormState = {
  imageUrl: "",
  altText: "",
  caption: "",
  isCover: true,
  sortOrder: "0",
  file: null
};

function toLocalDateTime(value: string | null): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toIsoIfValid(dateTimeLocalValue: string): string | null {
  if (!dateTimeLocalValue) return null;

  const parsed = new Date(dateTimeLocalValue);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toISOString();
}

function fromTattoo(item: BackendTattoo): FormState {
  return {
    title: item.title,
    categoryId: String(item.categoryId),
    style: item.style,
    bodyPart: item.bodyPart,
    technique: item.technique,
    description: item.description ?? "",
    healed: item.healed,
    fresh: item.fresh,
    beforeAfter: item.beforeAfter,
    featuredHome: item.featuredHome,
    published: item.published,
    workDate: toLocalDateTime(item.workDate)
  };
}

function sortTattooImages(images: BackendTattooImage[]) {
  return [...images].sort((a, b) => {
    if (a.isCover !== b.isCover) return a.isCover ? -1 : 1;
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id - b.id;
  });
}

export function AdminPortfolioItemClient({ id }: AdminPortfolioItemClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const numericTattooId = Number(id);
  const [categories, setCategories] = useState<BackendTattooCategory[]>([]);
  const [images, setImages] = useState<BackendTattooImage[]>([]);
  const [form, setForm] = useState<FormState | null>(null);
  const [imageForm, setImageForm] = useState<ImageFormState>(INITIAL_IMAGE_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageSaving, setIsImageSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [imageFeedback, setImageFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadItem() {
      setIsLoading(true);

      const [categoriesResponse, tattooResponse] = await Promise.all([
        requestApi<BackendTattooCategory[]>("/api/admin/tattoo-categories"),
        requestApi<BackendTattoo>(`/api/admin/tattoos/${id}`)
      ]);

      if (!isMounted) return;

      if (!isApiSuccess(categoriesResponse)) {
        setFeedback({ type: "error", message: categoriesResponse.error.message || "Falha ao carregar categorias." });
        setIsLoading(false);
        return;
      }

      if (!isApiSuccess(tattooResponse)) {
        setFeedback({ type: "error", message: tattooResponse.error.message || "Falha ao carregar tatuagem." });
        setIsLoading(false);
        return;
      }

      setCategories(categoriesResponse.data);
      setForm(fromTattoo(tattooResponse.data));
      setImages(sortTattooImages(tattooResponse.data.images ?? []));
      setIsLoading(false);
    }

    loadItem();
    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    setIsSaving(true);
    setFeedback(null);
    const workDateIso = toIsoIfValid(form.workDate);

    if (form.workDate && !workDateIso) {
      setIsSaving(false);
      setFeedback({ type: "error", message: "Data do trabalho inválida. Ajuste o campo e tente novamente." });
      return;
    }

    const response = await requestApi<BackendTattoo>(`/api/admin/tattoos/${id}`, {
      method: "PUT",
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
      setFeedback({ type: "error", message: response.error.message || "Falha ao atualizar tatuagem." });
      return;
    }

    setForm(fromTattoo(response.data));
    setImages(sortTattooImages(response.data.images ?? []));
    setFeedback({ type: "success", message: "Tatuagem atualizada." });
  }

  async function uploadLocalImage(file: File): Promise<UploadedImageResult | null> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData
    });

    const payload = (await response.json().catch(() => null)) as
      | { success: true; data: UploadedImageResult }
      | { success: false; error: { message?: string } }
      | null;

    if (!payload || !payload.success) {
      setImageFeedback({
        type: "error",
        message: payload?.error?.message || "Falha ao fazer upload da imagem."
      });
      return null;
    }

    return payload.data;
  }

  async function unsetPreviousCoverImages(nextCoverImageId: number) {
    const currentCoverImages = images.filter((item) => item.isCover && item.id !== nextCoverImageId);
    if (!currentCoverImages.length) return true;

    const responses = await Promise.all(
      currentCoverImages.map((item) =>
        requestApi<BackendTattooImage>(`/api/admin/tattoo-images/${item.id}`, {
          method: "PUT",
          body: { isCover: false }
        })
      )
    );

    return responses.every((item) => isApiSuccess(item));
  }

  async function handleCreateImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setImageFeedback(null);
    setIsImageSaving(true);

    const altText = imageForm.altText.trim();
    const typedImageUrl = imageForm.imageUrl.trim();
    const hasFile = Boolean(imageForm.file);

    if (!altText) {
      setIsImageSaving(false);
      setImageFeedback({ type: "error", message: "Texto alternativo é obrigatório para acessibilidade." });
      return;
    }

    if (!hasFile && !typedImageUrl) {
      setIsImageSaving(false);
      setImageFeedback({ type: "error", message: "Envie um arquivo ou informe a URL da imagem." });
      return;
    }

    let finalImageUrl = typedImageUrl;
    let storagePath: string | undefined;

    if (imageForm.file) {
      const uploadData = await uploadLocalImage(imageForm.file);
      if (!uploadData) {
        setIsImageSaving(false);
        return;
      }

      finalImageUrl = uploadData.imageUrl;
      storagePath = uploadData.storagePath;
    }

    const parsedSortOrder = Number(imageForm.sortOrder);
    const sortOrder = Number.isFinite(parsedSortOrder) ? parsedSortOrder : 0;

    const response = await requestApi<BackendTattooImage>("/api/admin/tattoo-images", {
      method: "POST",
      body: {
        tattooId: numericTattooId,
        imageUrl: finalImageUrl,
        storagePath,
        altText,
        caption: imageForm.caption.trim() || undefined,
        isCover: imageForm.isCover,
        sortOrder
      }
    });

    if (!isApiSuccess(response)) {
      setIsImageSaving(false);
      setImageFeedback({ type: "error", message: response.error.message || "Falha ao adicionar imagem." });
      return;
    }

    if (imageForm.isCover) {
      const coverUpdateOk = await unsetPreviousCoverImages(response.data.id);
      if (!coverUpdateOk) {
        setImageFeedback({
          type: "error",
          message: "Imagem criada, mas não foi possível atualizar as capas anteriores."
        });
      }
    }

    setImages((current) =>
      sortTattooImages(
        current.map((item) => ({
          ...item,
          isCover: imageForm.isCover ? false : item.isCover
        })).concat({ ...response.data, isCover: imageForm.isCover })
      )
    );
    setImageForm(INITIAL_IMAGE_FORM);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsImageSaving(false);
    setImageFeedback({ type: "success", message: "Imagem adicionada ao portfólio." });
  }

  async function handleDeleteImage(imageId: number) {
    const confirmed = window.confirm("Remover esta imagem do portfólio?");
    if (!confirmed) return;

    setIsImageSaving(true);
    setImageFeedback(null);

    const response = await requestApi<{ id: number }>(`/api/admin/tattoo-images/${imageId}`, {
      method: "DELETE"
    });

    setIsImageSaving(false);

    if (!isApiSuccess(response)) {
      setImageFeedback({ type: "error", message: response.error.message || "Falha ao remover imagem." });
      return;
    }

    setImages((current) => current.filter((item) => item.id !== imageId));
    setImageFeedback({ type: "success", message: "Imagem removida." });
  }

  async function handleSetCover(imageId: number) {
    setIsImageSaving(true);
    setImageFeedback(null);

    const updatePromises = images.map((item) =>
      requestApi<BackendTattooImage>(`/api/admin/tattoo-images/${item.id}`, {
        method: "PUT",
        body: { isCover: item.id === imageId }
      })
    );

    const responses = await Promise.all(updatePromises);
    const failed = responses.find((item) => !isApiSuccess(item));

    setIsImageSaving(false);

    if (failed && !isApiSuccess(failed)) {
      setImageFeedback({ type: "error", message: failed.error.message || "Falha ao atualizar capa." });
      return;
    }

    setImages((current) =>
      sortTattooImages(
        current.map((item) => ({
          ...item,
          isCover: item.id === imageId
        }))
      )
    );
    setImageFeedback({ type: "success", message: "Imagem de capa atualizada." });
  }

  async function handleDelete() {
    const response = await requestApi<{ id: number }>(`/api/admin/tattoos/${id}`, {
      method: "DELETE"
    });

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao remover tatuagem." });
      return;
    }

    router.push("/admin/portfolio");
  }

  if (isLoading || !form) {
    return (
      <div className={styles.status} role="status">
        Carregando item...
      </div>
    );
  }

  return (
    <AdminForm title={`Editar item #${id}`} description="Atualize dados da tatuagem e publicação.">
      <form onSubmit={handleSubmit} className="flow">
        <FormField label="Título" htmlFor="title">
          <input id="title" value={form.title} onChange={(event) => setForm((current) => (current ? { ...current, title: event.target.value } : current))} required />
        </FormField>
        <FormField label="Categoria" htmlFor="categoryId">
          <select
            id="categoryId"
            value={form.categoryId}
            onChange={(event) => setForm((current) => (current ? { ...current, categoryId: event.target.value } : current))}
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
          <input
            id="style"
            value={form.style}
            onChange={(event) => setForm((current) => (current ? { ...current, style: event.target.value } : current))}
            required
          />
        </FormField>
        <FormField label="Região do corpo" htmlFor="bodyPart">
          <input
            id="bodyPart"
            value={form.bodyPart}
            onChange={(event) => setForm((current) => (current ? { ...current, bodyPart: event.target.value } : current))}
            required
          />
        </FormField>
        <FormField label="Técnica" htmlFor="technique">
          <input
            id="technique"
            value={form.technique}
            onChange={(event) => setForm((current) => (current ? { ...current, technique: event.target.value } : current))}
            required
          />
        </FormField>
        <FormField label="Descrição (opcional)" htmlFor="description">
          <textarea
            id="description"
            value={form.description}
            onChange={(event) => setForm((current) => (current ? { ...current, description: event.target.value } : current))}
          />
        </FormField>
        <FormField label="Data do trabalho" htmlFor="workDate">
          <input
            id="workDate"
            type="datetime-local"
            value={form.workDate}
            onChange={(event) => setForm((current) => (current ? { ...current, workDate: event.target.value } : current))}
          />
        </FormField>
        <FormField label="Publicado?" htmlFor="published">
          <select
            id="published"
            value={form.published ? "true" : "false"}
            onChange={(event) => setForm((current) => (current ? { ...current, published: event.target.value === "true" } : current))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Destaque?" htmlFor="featuredHome">
          <select
            id="featuredHome"
            value={form.featuredHome ? "true" : "false"}
            onChange={(event) => setForm((current) => (current ? { ...current, featuredHome: event.target.value === "true" } : current))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Cicatrizada?" htmlFor="healed">
          <select
            id="healed"
            value={form.healed ? "true" : "false"}
            onChange={(event) => setForm((current) => (current ? { ...current, healed: event.target.value === "true" } : current))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Recém-feita?" htmlFor="fresh">
          <select
            id="fresh"
            value={form.fresh ? "true" : "false"}
            onChange={(event) => setForm((current) => (current ? { ...current, fresh: event.target.value === "true" } : current))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>
        <FormField label="Antes/Depois?" htmlFor="beforeAfter">
          <select
            id="beforeAfter"
            value={form.beforeAfter ? "true" : "false"}
            onChange={(event) => setForm((current) => (current ? { ...current, beforeAfter: event.target.value === "true" } : current))}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </FormField>

        <div className={styles.inlineActions}>
          <button type="submit" className="chip" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Atualizar item"}
          </button>
          <button type="button" className={styles.dangerButton} onClick={handleDelete}>
            Remover item
          </button>
        </div>
      </form>

      {feedback ? (
        <p className={feedback.type === "error" ? styles.error : styles.success} role={feedback.type === "error" ? "alert" : "status"}>
          {feedback.message}
        </p>
      ) : null}

      <section className={styles.imageSection} aria-labelledby="tattoo-images-title">
        <h2 id="tattoo-images-title">Fotos do portfólio</h2>
        <p className={styles.imageSectionHint}>
          Envie uma foto do computador ou informe uma URL pública. A primeira capa aparece em destaque no site.
        </p>

        <form onSubmit={handleCreateImage} className="flow">
          <FormField label="Arquivo de imagem (opcional)" htmlFor="portfolioImageFile" hint="Formatos aceitos: JPG, PNG, WEBP, AVIF (até 5MB)">
            <input
              id="portfolioImageFile"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(event) =>
                setImageForm((current) => ({
                  ...current,
                  file: event.target.files?.[0] ?? null
                }))
              }
            />
          </FormField>

          <FormField label="URL da imagem (opcional)" htmlFor="portfolioImageUrl" hint="Use quando a imagem já estiver hospedada.">
            <input
              id="portfolioImageUrl"
              type="url"
              value={imageForm.imageUrl}
              onChange={(event) => setImageForm((current) => ({ ...current, imageUrl: event.target.value }))}
              placeholder="https://..."
            />
          </FormField>

          <FormField label="Texto alternativo" htmlFor="portfolioAltText">
            <input
              id="portfolioAltText"
              value={imageForm.altText}
              onChange={(event) => setImageForm((current) => ({ ...current, altText: event.target.value }))}
              required
            />
          </FormField>

          <FormField label="Legenda (opcional)" htmlFor="portfolioCaption">
            <input
              id="portfolioCaption"
              value={imageForm.caption}
              onChange={(event) => setImageForm((current) => ({ ...current, caption: event.target.value }))}
            />
          </FormField>

          <FormField label="Ordem de exibição" htmlFor="portfolioSortOrder">
            <input
              id="portfolioSortOrder"
              type="number"
              min={0}
              step={1}
              value={imageForm.sortOrder}
              onChange={(event) => setImageForm((current) => ({ ...current, sortOrder: event.target.value }))}
            />
          </FormField>

          <FormField label="Definir como capa?" htmlFor="portfolioIsCover">
            <select
              id="portfolioIsCover"
              value={imageForm.isCover ? "true" : "false"}
              onChange={(event) => setImageForm((current) => ({ ...current, isCover: event.target.value === "true" }))}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </FormField>

          <button type="submit" className="chip" disabled={isImageSaving}>
            {isImageSaving ? "Enviando..." : "Adicionar foto"}
          </button>
        </form>

        {imageFeedback ? (
          <p className={imageFeedback.type === "error" ? styles.error : styles.success} role={imageFeedback.type === "error" ? "alert" : "status"}>
            {imageFeedback.message}
          </p>
        ) : null}

        {images.length ? (
          <ul className={styles.imagesList} aria-label="Lista de fotos cadastradas">
            {images.map((image) => (
              <li key={image.id} className={styles.imageCard}>
                <div className={styles.imagePreviewWrap}>
                  <img src={image.imageUrl} alt={image.altText} className={styles.imagePreview} loading="lazy" />
                </div>
                <div className={styles.imageMeta}>
                  <strong>Imagem #{image.id}</strong>
                  <span>{image.altText}</span>
                  {image.caption ? <span>{image.caption}</span> : null}
                  <span>Ordem: {image.sortOrder}</span>
                  <span>{image.isCover ? "Capa atual" : "Imagem secundária"}</span>
                </div>
                <div className={styles.inlineActions}>
                  {!image.isCover ? (
                    <button type="button" className={styles.smallButton} onClick={() => handleSetCover(image.id)} disabled={isImageSaving}>
                      Definir capa
                    </button>
                  ) : null}
                  <button type="button" className={styles.dangerButton} onClick={() => handleDeleteImage(image.id)} disabled={isImageSaving}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.status} role="status">
            Nenhuma foto cadastrada para este item ainda.
          </p>
        )}
      </section>
    </AdminForm>
  );
}
