"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendArtistProfile } from "@/types/backend";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import styles from "../admin.module.css";

type ProfileFormState = {
  fullName: string;
  artisticName: string;
  bioShort: string;
  bioLong: string;
  favoriteStyles: string;
  artInspirations: string;
  studioName: string;
  city: string;
  profileImageUrl: string;
};

const INITIAL_STATE: ProfileFormState = {
  fullName: "",
  artisticName: "",
  bioShort: "",
  bioLong: "",
  favoriteStyles: "",
  artInspirations: "",
  studioName: "",
  city: "",
  profileImageUrl: ""
};

function fromApi(profile: BackendArtistProfile): ProfileFormState {
  return {
    fullName: profile.fullName,
    artisticName: profile.artisticName,
    bioShort: profile.bioShort,
    bioLong: profile.bioLong,
    favoriteStyles: profile.favoriteStyles.join(", "),
    artInspirations: profile.artInspirations.join(", "),
    studioName: profile.studioName,
    city: profile.city,
    profileImageUrl: profile.profileImageUrl ?? ""
  };
}

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminBioClient() {
  const [form, setForm] = useState<ProfileFormState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      const response = await requestApi<BackendArtistProfile>("/api/admin/artist-profile");

      if (!isMounted) return;

      if (!isApiSuccess(response)) {
        setError(response.error.message || "Não foi possível carregar a bio.");
        setIsLoading(false);
        return;
      }

      setForm(fromApi(response.data));
      setError("");
      setIsLoading(false);
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasFeedback = useMemo(() => Boolean(error || success), [error, success]);

  function update<K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const response = await requestApi<BackendArtistProfile>("/api/admin/artist-profile", {
      method: "PUT",
      body: {
        fullName: form.fullName,
        artisticName: form.artisticName,
        bioShort: form.bioShort,
        bioLong: form.bioLong,
        favoriteStyles: parseList(form.favoriteStyles),
        artInspirations: parseList(form.artInspirations),
        studioName: form.studioName,
        city: form.city,
        profileImageUrl: form.profileImageUrl || null
      }
    });

    setIsSubmitting(false);

    if (!isApiSuccess(response)) {
      setError(response.error.message || "Falha ao salvar bio.");
      return;
    }

    setForm(fromApi(response.data));
    setSuccess("Bio atualizada com sucesso.");
  }

  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Carregando bio da artista...
      </div>
    );
  }

  return (
    <AdminForm title="Bio da artista" description="Atualize informações institucionais exibidas no site.">
      <form onSubmit={handleSubmit} className="flow">
        <FormField label="Nome completo" htmlFor="fullName">
          <input id="fullName" value={form.fullName} onChange={(event) => update("fullName", event.target.value)} required />
        </FormField>
        <FormField label="Nome artístico" htmlFor="artisticName">
          <input id="artisticName" value={form.artisticName} onChange={(event) => update("artisticName", event.target.value)} required />
        </FormField>
        <FormField label="Bio curta" htmlFor="bioShort">
          <textarea id="bioShort" value={form.bioShort} onChange={(event) => update("bioShort", event.target.value)} required />
        </FormField>
        <FormField label="Bio completa" htmlFor="bioLong">
          <textarea id="bioLong" value={form.bioLong} onChange={(event) => update("bioLong", event.target.value)} required />
        </FormField>
        <FormField label="Estilos favoritos (separados por vírgula)" htmlFor="favoriteStyles">
          <input
            id="favoriteStyles"
            value={form.favoriteStyles}
            onChange={(event) => update("favoriteStyles", event.target.value)}
            required
          />
        </FormField>
        <FormField label="Inspirações (separadas por vírgula)" htmlFor="artInspirations">
          <input
            id="artInspirations"
            value={form.artInspirations}
            onChange={(event) => update("artInspirations", event.target.value)}
            required
          />
        </FormField>
        <FormField label="Studio / local de atendimento" htmlFor="studioName">
          <input id="studioName" value={form.studioName} onChange={(event) => update("studioName", event.target.value)} required />
        </FormField>
        <FormField label="Cidade" htmlFor="city">
          <input id="city" value={form.city} onChange={(event) => update("city", event.target.value)} required />
        </FormField>
        <FormField label="URL da foto profissional" htmlFor="profileImageUrl">
          <input
            id="profileImageUrl"
            type="url"
            value={form.profileImageUrl}
            onChange={(event) => update("profileImageUrl", event.target.value)}
          />
        </FormField>

        <div className={styles.inlineActions}>
          <button type="submit" className="chip" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar bio"}
          </button>
        </div>

        {hasFeedback ? (
          <p className={error ? styles.error : styles.success} role={error ? "alert" : "status"}>
            {error || success}
          </p>
        ) : null}
      </form>
    </AdminForm>
  );
}

