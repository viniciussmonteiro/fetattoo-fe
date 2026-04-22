"use client";

import { FormEvent, useEffect, useState } from "react";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import type { BackendSiteSettings } from "@/types/backend";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import styles from "../admin.module.css";

type AvailabilitySettings = {
  id: number;
  title: string;
  description: string;
  bookingOpen: boolean;
  bookingNote: string | null;
  updatedAt: string;
};

const EMPTY_SITE_SETTINGS: BackendSiteSettings = {
  id: 0,
  siteName: "",
  artistName: "",
  headline: "",
  city: "",
  state: "",
  whatsapp: "",
  email: "",
  instagram: "",
  address: "",
  availabilityText: "",
  heroImageUrl: "",
  heroVideoUrl: "",
  copyrightText: "",
  createdAt: "",
  updatedAt: ""
};

const EMPTY_AVAILABILITY: AvailabilitySettings = {
  id: 0,
  title: "",
  description: "",
  bookingOpen: true,
  bookingNote: "",
  updatedAt: ""
};

export function AdminSettingsClient() {
  const [siteSettings, setSiteSettings] = useState<BackendSiteSettings>(EMPTY_SITE_SETTINGS);
  const [availability, setAvailability] = useState<AvailabilitySettings>(EMPTY_AVAILABILITY);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadSettings() {
    setIsLoading(true);
    const [siteResponse, availabilityResponse] = await Promise.all([
      requestApi<BackendSiteSettings>("/api/admin/site-settings"),
      requestApi<AvailabilitySettings>("/api/admin/availability")
    ]);

    if (!isApiSuccess(siteResponse)) {
      setFeedback({ type: "error", message: siteResponse.error.message || "Falha ao carregar configurações gerais." });
      setIsLoading(false);
      return;
    }

    if (!isApiSuccess(availabilityResponse)) {
      setFeedback({ type: "error", message: availabilityResponse.error.message || "Falha ao carregar disponibilidade." });
      setIsLoading(false);
      return;
    }

    setSiteSettings(siteResponse.data);
    setAvailability(availabilityResponse.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSiteSettingsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const response = await requestApi<BackendSiteSettings>("/api/admin/site-settings", {
      method: "PUT",
      body: {
        siteName: siteSettings.siteName,
        artistName: siteSettings.artistName,
        headline: siteSettings.headline,
        city: siteSettings.city,
        state: siteSettings.state,
        whatsapp: siteSettings.whatsapp,
        email: siteSettings.email,
        instagram: siteSettings.instagram,
        address: siteSettings.address || null,
        availabilityText: siteSettings.availabilityText,
        heroImageUrl: siteSettings.heroImageUrl || null,
        heroVideoUrl: siteSettings.heroVideoUrl || null,
        copyrightText: siteSettings.copyrightText
      }
    });

    setIsSaving(false);

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao salvar configurações gerais." });
      return;
    }

    setSiteSettings(response.data);
    setFeedback({ type: "success", message: "Configurações gerais atualizadas." });
  }

  async function handleAvailabilitySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const response = await requestApi<AvailabilitySettings>("/api/admin/availability", {
      method: "PUT",
      body: {
        title: availability.title,
        description: availability.description,
        bookingOpen: availability.bookingOpen,
        bookingNote: availability.bookingNote || null
      }
    });

    setIsSaving(false);

    if (!isApiSuccess(response)) {
      setFeedback({ type: "error", message: response.error.message || "Falha ao salvar disponibilidade." });
      return;
    }

    setAvailability(response.data);
    setFeedback({ type: "success", message: "Disponibilidade atualizada." });
  }

  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="flow">
      <AdminForm title="Configurações gerais" description="Dados institucionais da home, contato e metadados básicos.">
        <form onSubmit={handleSiteSettingsSubmit} className="flow">
          <FormField label="Nome do site" htmlFor="siteName">
            <input
              id="siteName"
              value={siteSettings.siteName}
              onChange={(event) => setSiteSettings((current) => ({ ...current, siteName: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Nome da artista" htmlFor="artistName">
            <input
              id="artistName"
              value={siteSettings.artistName}
              onChange={(event) => setSiteSettings((current) => ({ ...current, artistName: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Headline" htmlFor="headline">
            <input
              id="headline"
              value={siteSettings.headline}
              onChange={(event) => setSiteSettings((current) => ({ ...current, headline: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Cidade" htmlFor="city">
            <input
              id="city"
              value={siteSettings.city}
              onChange={(event) => setSiteSettings((current) => ({ ...current, city: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Estado" htmlFor="state">
            <input
              id="state"
              value={siteSettings.state}
              onChange={(event) => setSiteSettings((current) => ({ ...current, state: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Bairro / endereço resumido" htmlFor="address">
            <input
              id="address"
              value={siteSettings.address ?? ""}
              onChange={(event) => setSiteSettings((current) => ({ ...current, address: event.target.value }))}
            />
          </FormField>
          <FormField label="WhatsApp" htmlFor="whatsapp">
            <input
              id="whatsapp"
              type="url"
              value={siteSettings.whatsapp}
              onChange={(event) => setSiteSettings((current) => ({ ...current, whatsapp: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Instagram" htmlFor="instagram">
            <input
              id="instagram"
              type="url"
              value={siteSettings.instagram}
              onChange={(event) => setSiteSettings((current) => ({ ...current, instagram: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="E-mail" htmlFor="email">
            <input
              id="email"
              type="email"
              value={siteSettings.email}
              onChange={(event) => setSiteSettings((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Texto de disponibilidade" htmlFor="availabilityText">
            <textarea
              id="availabilityText"
              value={siteSettings.availabilityText}
              onChange={(event) => setSiteSettings((current) => ({ ...current, availabilityText: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Hero image URL" htmlFor="heroImageUrl">
            <input
              id="heroImageUrl"
              type="url"
              value={siteSettings.heroImageUrl ?? ""}
              onChange={(event) => setSiteSettings((current) => ({ ...current, heroImageUrl: event.target.value }))}
            />
          </FormField>
          <FormField label="Copyright" htmlFor="copyrightText">
            <input
              id="copyrightText"
              value={siteSettings.copyrightText}
              onChange={(event) => setSiteSettings((current) => ({ ...current, copyrightText: event.target.value }))}
              required
            />
          </FormField>
          <button type="submit" className="chip" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar configurações"}
          </button>
        </form>
      </AdminForm>

      <AdminForm title="Disponibilidade / agenda" description="Informações dinâmicas exibidas para novos agendamentos.">
        <form onSubmit={handleAvailabilitySubmit} className="flow">
          <FormField label="Título" htmlFor="availability-title">
            <input
              id="availability-title"
              value={availability.title}
              onChange={(event) => setAvailability((current) => ({ ...current, title: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Descrição" htmlFor="availability-description">
            <textarea
              id="availability-description"
              value={availability.description}
              onChange={(event) => setAvailability((current) => ({ ...current, description: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Observação de agenda" htmlFor="availability-note">
            <textarea
              id="availability-note"
              value={availability.bookingNote ?? ""}
              onChange={(event) => setAvailability((current) => ({ ...current, bookingNote: event.target.value }))}
            />
          </FormField>
          <FormField label="Agenda aberta?" htmlFor="booking-open">
            <select
              id="booking-open"
              value={availability.bookingOpen ? "true" : "false"}
              onChange={(event) => setAvailability((current) => ({ ...current, bookingOpen: event.target.value === "true" }))}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </FormField>
          <button type="submit" className="chip" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar disponibilidade"}
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

