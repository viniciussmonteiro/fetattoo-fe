"use client";

import { FormEvent } from "react";
import { portfolioCategories } from "@/data/portfolio";
import { useContactForm } from "@/hooks/useContactForm";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const { state, submit } = useContactForm();
  const isLoading = state.status === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const isSuccess = await submit({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      desiredStyle: String(formData.get("desiredStyle") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? "")
    });

    if (isSuccess) {
      form.reset();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Formulário de contato para orçamento">
      <div className={styles.field}>
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required />
      </div>

      <div className={styles.twoCols}>
        <div className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={150} required />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Telefone ou WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" minLength={8} maxLength={30} required />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="desiredStyle">Estilo desejado</label>
        <select id="desiredStyle" name="desiredStyle" defaultValue="" required>
          <option value="" disabled>
            Selecione um estilo
          </option>
          {portfolioCategories
            .filter((category) => category !== "Todas")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          <option value="Cover-up">Cover-up</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Conte sua ideia, tamanho aproximado, região do corpo e referências."
          minLength={10}
          maxLength={3000}
          required
        />
      </div>

      <div className={styles.honeypot} aria-hidden>
        <label htmlFor="company">Empresa</label>
        <input id="company" name="company" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <button type="submit" className={styles.submit} disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? "Enviando..." : "Enviar solicitação"}
      </button>

      {state.status !== "idle" ? (
        <p className={state.status === "error" ? styles.error : styles.success} role="status" aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <p className={styles.note}>
        Formulário validado para integração com API segura de contato e CRM.
      </p>
    </form>
  );
}
