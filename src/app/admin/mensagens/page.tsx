import { createPageMetadata } from "@/lib/metadata";
import { AdminMessagesClient } from "./AdminMessagesClient";

export const metadata = createPageMetadata({
  title: "Admin Mensagens",
  description: "Mensagens recebidas pelo formulário de contato.",
  path: "/admin/mensagens",
  noIndex: true
});

export default function AdminMessagesPage() {
  return <AdminMessagesClient />;
}

