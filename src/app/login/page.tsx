import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { getAdminSession } from "@/lib/server/auth";
import { AdminLogin } from "@/components/AdminLogin/AdminLogin";

export const metadata: Metadata = createPageMetadata({
  title: "Login Admin",
  description: "Acesso administrativo para gestão de conteúdo do site.",
  path: "/login",
  noIndex: true
});

export default async function LoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return <AdminLogin />;
}

