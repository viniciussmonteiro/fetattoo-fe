import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "@/types/api";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      success: true,
      data
    },
    { status }
  );
}

export function apiFailure(message: string, status = 400, details?: unknown) {
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
