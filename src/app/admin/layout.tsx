import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/metadata";
import { AdminLayout as AdminShell } from "@/components/AdminLayout/AdminLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Admin",
  description: "Painel administrativo da Ana Noir Tattoo para gestão de portfólio e conteúdo.",
  path: "/admin",
  noIndex: true
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
