import { createPageMetadata } from "@/lib/metadata";
import { AdminTestimonialsClient } from "./AdminTestimonialsClient";

export const metadata = createPageMetadata({
  title: "Admin Depoimentos",
  description: "Gestão de depoimentos exibidos na home e páginas institucionais.",
  path: "/admin/depoimentos",
  noIndex: true
});

export default function AdminTestimonialsPage() {
  return <AdminTestimonialsClient />;
}

