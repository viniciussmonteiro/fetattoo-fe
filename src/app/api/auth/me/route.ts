import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { requestBackend } from "@/lib/server/backend-request";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/session";
import type { ApiFailure, ApiSuccess } from "@/types/api";

type MeResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
};

function unauthorized(message = "Sessão inválida ou expirada.") {
  return NextResponse.json<ApiFailure>(
    {
      success: false,
      error: {
        message
      }
    },
    { status: 401 }
  );
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return unauthorized();
  }

  let upstream;
  try {
    upstream = await requestBackend<MeResponse>({
      path: "/api/auth/me",
      token
    });
  } catch {
    cookieStore.delete(ADMIN_TOKEN_COOKIE);
    return unauthorized("Falha de comunicação com o back-end.");
  }

  if (!upstream.ok || !upstream.data) {
    cookieStore.delete(ADMIN_TOKEN_COOKIE);
    return unauthorized(upstream.message);
  }

  return NextResponse.json<ApiSuccess<MeResponse>>({
    success: true,
    data: upstream.data
  });
}
