import path from "node:path";
import crypto from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/session";
import { createBackendUrl, getBackendBaseUrl } from "@/lib/server/backend-url";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";
import type { ApiFailure } from "@/types/api";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const extensionByMimeType: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif"
};

type UploadImageSuccess = {
  imageUrl: string;
  storagePath: string;
  contentType: string;
  size: number;
};

async function validateAdminSession(token: string) {
  const backendBaseUrl = getBackendBaseUrl();
  if (!backendBaseUrl) {
    return {
      ok: false,
      message: "BACKEND_API_URL não configurada.",
      status: 503
    } as const;
  }

  try {
    const response = await fetch(createBackendUrl("/api/auth/me"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        ok: false,
        message: "Sessão inválida ou expirada.",
        status: 401
      } as const;
    }

    return { ok: true } as const;
  } catch {
    return {
      ok: false,
      message: "Falha de comunicação com o back-end.",
      status: 502
    } as const;
  }
}

function safeFileExtension(contentType: string) {
  return extensionByMimeType[contentType] ?? ".img";
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

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

  const sessionResult = await validateAdminSession(token);
  if (!sessionResult.ok) {
    if (sessionResult.status === 401) {
      cookieStore.delete(ADMIN_TOKEN_COOKIE);
    }
    return apiFailure(sessionResult.message, sessionResult.status);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return apiFailure("Falha ao ler arquivo enviado.", 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return apiFailure("Arquivo de imagem obrigatório.", 422);
  }

  const normalizedMime = file.type.trim().toLowerCase();
  if (!allowedMimeTypes.has(normalizedMime)) {
    return apiFailure("Tipo de arquivo não permitido. Envie JPG, PNG, WEBP ou AVIF.", 422);
  }

  if (file.size <= 0) {
    return apiFailure("Arquivo inválido.", 422);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return apiFailure("Arquivo excede o tamanho máximo de 5MB.", 422);
  }

  const extension = safeFileExtension(normalizedMime);
  const fileName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;
  const relativeDir = path.join("uploads", "tattoos");
  const relativePath = path.join(relativeDir, fileName);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  try {
    await mkdir(absoluteDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absolutePath, buffer);
  } catch {
    return apiFailure("Falha ao salvar imagem.", 500);
  }

  const normalizedRelativePath = relativePath.replace(/\\/g, "/");
  const imageUrl = `/${normalizedRelativePath}`;
  const storagePath = `local/${normalizedRelativePath}`;

  return apiSuccess<UploadImageSuccess>({
    imageUrl,
    storagePath,
    contentType: normalizedMime,
    size: file.size
  });
}

