import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { AdminLayout as AdminShell } from "@/components/AdminLayout/AdminLayout";
import { getAdminSession } from "@/lib/server/auth";

export const metadata: Metadata = createPageMetadata({
  title: "Admin",
  description: "Painel administrativo da Fernanda Borges para gestão de portfólio e conteúdo.",
  path: "/admin",
  noIndex: true
});

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/login?next=/admin");
  }

  return <AdminShell userEmail={session.email}>{children}</AdminShell>;
}
