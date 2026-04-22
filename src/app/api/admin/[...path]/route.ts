import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createBackendUrl, getBackendBaseUrl } from "@/lib/server/backend-url";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/session";
import type { ApiFailure } from "@/types/api";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function readJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function proxyToAdmin(request: Request, context: RouteContext) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!getBackendBaseUrl()) {
    return NextResponse.json<ApiFailure>(
      {
        success: false,
        error: {
          message: "BACKEND_API_URL não configurada."
        }
      },
      { status: 503 }
    );
  }

  if (!token) {
    return NextResponse.json<ApiFailure>(
      {
        success: false,
        error: {
          message: "Sessão inválida ou expirada."
        }
      },
      { status: 401 }
    );
  }

  const { path } = await context.params;
  const requestUrl = new URL(request.url);
  const upstreamUrl = createBackendUrl(`/api/admin/${path.join("/")}`, requestUrl.search);

  const contentType = request.headers.get("content-type");
  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const bodyAllowed = request.method !== "GET" && request.method !== "HEAD";
  const body = bodyAllowed ? await request.text() : undefined;

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      ...(bodyAllowed ? { body } : {}),
      cache: "no-store"
    });
  } catch {
    return NextResponse.json<ApiFailure>(
      {
        success: false,
        error: {
          message: "Falha de comunicação com o back-end."
        }
      },
      { status: 502 }
    );
  }

  if (upstreamResponse.status === 401 || upstreamResponse.status === 403) {
    cookieStore.delete(ADMIN_TOKEN_COOKIE);
  }

  const payload = await readJsonSafely(upstreamResponse);

  if (payload) {
    return NextResponse.json(payload, { status: upstreamResponse.status });
  }

  return NextResponse.json<ApiFailure>(
    {
      success: false,
      error: {
        message: "Falha de integração com o back-end."
      }
    },
    { status: 502 }
  );
}

export async function GET(request: Request, context: RouteContext) {
  return proxyToAdmin(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return proxyToAdmin(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return proxyToAdmin(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxyToAdmin(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return proxyToAdmin(request, context);
}
