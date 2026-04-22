import "server-only";

const DEFAULT_BACKEND_URL = "http://localhost:4000";

function normalizeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getBackendBaseUrl(): string | null {
  const configured = process.env.BACKEND_API_URL?.trim();

  if (!configured) {
    return null;
  }

  return normalizeUrl(configured);
}

export function getBackendBaseUrlWithFallback(): string {
  return getBackendBaseUrl() ?? DEFAULT_BACKEND_URL;
}

export function createBackendUrl(pathname: string, search = ""): string {
  const baseUrl = getBackendBaseUrlWithFallback();
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const suffix = search ? (search.startsWith("?") ? search : `?${search}`) : "";
  return `${baseUrl}${normalizedPath}${suffix}`;
}

