import { createPageMetadata } from "@/lib/metadata";
import { AdminSettingsClient } from "./AdminSettingsClient";

export const metadata = createPageMetadata({
  title: "Admin Configurações",
  description: "Configurações gerais do projeto e integrações.",
  path: "/admin/configuracoes",
  noIndex: true
});

export default function AdminSettingsPage() {
  return <AdminSettingsClient />;
}

