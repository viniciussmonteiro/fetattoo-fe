"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { requestApi } from "@/lib/api/client";
import { isApiSuccess } from "@/types/api";
import styles from "./AdminLogin.module.css";

type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

function resolveNextPath(value: string | null): string {
  if (!value || !value.startsWith("/")) {
    return "/admin";
  }

  if (value.startsWith("//")) {
    return "/admin";
  }

  return value;
}

export function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nextPath = useMemo(() => resolveNextPath(searchParams.get("next")), [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const response = await requestApi<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: {
        email,
        password
      }
    });

    setIsLoading(false);

    if (!isApiSuccess(response)) {
      setErrorMessage(response.error.message || "Credenciais inválidas.");
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <section className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit} aria-label="Login administrativo">
        <span className="eyebrow">Área administrativa</span>
        <h1>Acesso do admin</h1>
        <p className={styles.lead}>Entre com seu e-mail e senha para gerenciar o conteúdo do site.</p>

        <div className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>

        <button type="submit" className={styles.submit} disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        {errorMessage ? (
          <p className={styles.error} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}

