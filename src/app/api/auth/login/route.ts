import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { requestBackend } from "@/lib/server/backend-request";
import { ADMIN_SESSION_MAX_AGE_SECONDS, ADMIN_TOKEN_COOKIE } from "@/lib/auth/session";
import type { ApiFailure, ApiSuccess } from "@/types/api";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponseBody = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

function failure(message: string, status = 400) {
  return NextResponse.json<ApiFailure>(
    {
      success: false,
      error: {
        message
      }
    },
    { status }
  );
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return failure("Formato inválido. Envie os dados em JSON.", 415);
  }

  const body = (await request.json().catch(() => null)) as LoginRequestBody | null;

  if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
    return failure("Payload inválido.", 400);
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return failure("Payload inválido.", 422);
  }

  let upstream;
  try {
    upstream = await requestBackend<LoginResponseBody>({
      path: "/api/auth/login",
      method: "POST",
      body: {
        email,
        password
      }
    });
  } catch {
    return failure("Falha de comunicação com o back-end.", 502);
  }

  if (!upstream.ok || !upstream.data) {
    return failure(upstream.message ?? "Não foi possível autenticar.", upstream.status || 502);
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_TOKEN_COOKIE,
    value: upstream.data.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS
  });

  return NextResponse.json<ApiSuccess<{ user: LoginResponseBody["user"] }>>({
    success: true,
    data: {
      user: upstream.data.user
    }
  });
}
