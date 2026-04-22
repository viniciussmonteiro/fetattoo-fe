import "server-only";
import { cookies } from "next/headers";
import { requestBackend } from "@/lib/server/backend-request";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/session";

export type AdminSession = {
  userId: string;
  name: string;
  email: string;
  role: "admin";
};

type BackendAdminUser = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const response = await requestBackend<BackendAdminUser>({
    path: "/api/auth/me",
    token
  });

  if (!response.ok || !response.data) {
    cookieStore.delete(ADMIN_TOKEN_COOKIE);
    return null;
  }

  return {
    userId: String(response.data.id),
    name: response.data.name,
    email: response.data.email,
    role: "admin"
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

