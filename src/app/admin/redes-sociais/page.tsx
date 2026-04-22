import { createPageMetadata } from "@/lib/metadata";
import { AdminSocialLinksClient } from "./AdminSocialLinksClient";

export const metadata = createPageMetadata({
  title: "Admin Redes Sociais",
  description: "Gestão de links sociais e canais de contato.",
  path: "/admin/redes-sociais",
  noIndex: true
});

export default function AdminSocialLinksPage() {
  return <AdminSocialLinksClient />;
}

