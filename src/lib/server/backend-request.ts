import "server-only";
import type { ApiResponse } from "@/types/api";
import { createBackendUrl, getBackendBaseUrl } from "@/lib/server/backend-url";

type BackendRequestOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  token?: string;
  body?: unknown;
  search?: string;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  timeoutMs?: number;
};

export type BackendRequestResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  message?: string;
  raw?: unknown;
};

async function parseJsonSafely<T>(response: Response): Promise<ApiResponse<T> | null> {
  try {
    return (await response.json()) as ApiResponse<T>;
  } catch {
    return null;
  }
}

export async function requestBackend<T>({
  path,
  method = "GET",
  token,
  body,
  search = "",
  cache = "no-store",
  next,
  timeoutMs = 4000
}: BackendRequestOptions): Promise<BackendRequestResult<T>> {
  if (!getBackendBaseUrl()) {
    return {
      ok: false,
      status: 503,
      message: "BACKEND_API_URL não configurada."
    };
  }

  const headers: HeadersInit = {
    Accept: "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), timeoutMs);
  let response: Response;

  try {
    response = await fetch(createBackendUrl(path, search), {
      method,
      headers,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      cache,
      ...(next ? { next } : {}),
      signal: abortController.signal
    });
  } catch {
    clearTimeout(timeout);
    return {
      ok: false,
      status: 502,
      message: "Falha de comunicação com o back-end."
    };
  } finally {
    clearTimeout(timeout);
  }

  const payload = await parseJsonSafely<T>(response);

  if (!payload || !response.ok || !payload.success) {
    return {
      ok: false,
      status: response.status,
      message: payload && !payload.success ? payload.error.message : "Falha de comunicação com o back-end.",
      raw: payload
    };
  }

  return {
    ok: true,
    status: response.status,
    data: payload.data
  };
}
