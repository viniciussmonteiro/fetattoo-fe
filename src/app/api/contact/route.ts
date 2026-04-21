import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "@/types/api";
import type { ContactPayload, ContactSubmissionResult } from "@/types/contact";

const MAX_TEXT_LENGTH = 3000;

function success(data: ContactSubmissionResult, status = 200) {
  return NextResponse.json<ApiSuccess<ContactSubmissionResult>>(
    {
      success: true,
      data
    },
    { status }
  );
}

function failure(message: string, status = 400, details?: unknown) {
  return NextResponse.json<ApiFailure>(
    {
      success: false,
      error: {
        message,
        details
      }
    },
    { status }
  );
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function normalizeOptional(value: unknown): string | undefined {
  if (!isString(value)) return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function normalizePayload(payload: unknown): ContactPayload | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source = payload as Record<string, unknown>;

  const name = normalizeOptional(source.name);
  const email = normalizeOptional(source.email)?.toLowerCase();
  const phone = normalizeOptional(source.phone);
  const desiredStyle = normalizeOptional(source.desiredStyle) ?? normalizeOptional(source.style);
  const message = normalizeOptional(source.message);
  const company = normalizeOptional(source.company);

  if (!name || name.length < 2 || name.length > 120) return null;
  if (!email || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (phone && (phone.length < 8 || phone.length > 30)) return null;
  if (desiredStyle && (desiredStyle.length < 2 || desiredStyle.length > 80)) return null;
  if (!message || message.length < 10 || message.length > MAX_TEXT_LENGTH) return null;
  if (company && company.length > 0) return null;

  return {
    name,
    email,
    phone,
    desiredStyle,
    message,
    company
  };
}

export async function POST(request: Request) {
  let payload: ContactPayload | null = null;

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return failure("Formato inválido. Envie os dados em JSON.", 415);
  }

  try {
    const body = (await request.json()) as unknown;
    payload = normalizePayload(body);
  } catch {
    return failure("Payload inválido.", 400);
  }

  if (!payload) {
    return failure("Erro de validação dos dados enviados.", 422);
  }

  const backendBaseUrl = process.env.BACKEND_API_URL?.trim();

  if (!backendBaseUrl) {
    return success(
      {
        provider: "mock",
        receivedAt: new Date().toISOString()
      },
      201
    );
  }

  try {
    const upstreamResponse = await fetch(`${backendBaseUrl}/api/public/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    const upstreamJson = (await upstreamResponse.json().catch(() => null)) as
      | { success?: boolean; error?: { message?: string } }
      | null;

    if (!upstreamResponse.ok) {
      return failure(
        upstreamJson?.error?.message ?? "Não foi possível processar o contato no back-end.",
        upstreamResponse.status
      );
    }

    return success(
      {
        provider: "backend",
        receivedAt: new Date().toISOString()
      },
      201
    );
  } catch {
    return failure("Falha de integração com o back-end de contato.", 502);
  }
}
