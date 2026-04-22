import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/session";
import type { ApiSuccess } from "@/types/api";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_COOKIE);

  return NextResponse.json<ApiSuccess<{ loggedOut: true }>>({
    success: true,
    data: {
      loggedOut: true
    }
  });
}

