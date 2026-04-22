"use client";

import type { ApiResponse } from "@/types/api";

type RequestApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
};

export async function requestApi<T>(path: string, options: RequestApiOptions = {}): Promise<ApiResponse<T>> {
  const response = await fetch(path, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
    ...(options.signal ? { signal: options.signal } : {})
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (response.status === 401 && path.startsWith("/api/admin")) {
    const currentPath = window.location.pathname + window.location.search;
    if (!window.location.pathname.startsWith("/login")) {
      window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
    }
  }

  if (!payload) {
    return {
      success: false,
      error: {
        message: "Resposta inválida da API."
      }
    };
  }

  return payload;
}
