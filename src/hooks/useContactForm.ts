"use client";

import { useState } from "react";
import { isApiSuccess, type ApiResponse } from "@/types/api";
import type { ContactPayload, ContactSubmissionResult } from "@/types/contact";

type ContactFormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export function useContactForm() {
  const [state, setState] = useState<ContactFormState>({
    status: "idle",
    message: ""
  });

  async function submit(payload: ContactPayload): Promise<boolean> {
    setState({ status: "loading", message: "Enviando..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as ApiResponse<ContactSubmissionResult>;

      if (!response.ok || !isApiSuccess(data)) {
        throw new Error(!isApiSuccess(data) ? data.error.message : "Falha ao enviar");
      }

      setState({
        status: "success",
        message: "Solicitação enviada com sucesso. Em breve retorno com os próximos passos."
      });
      return true;
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Não foi possível enviar agora."
      });
      return false;
    }
  }

  return {
    state,
    submit
  };
}
