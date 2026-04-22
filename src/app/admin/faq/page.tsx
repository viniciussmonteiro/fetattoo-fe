import { createPageMetadata } from "@/lib/metadata";
import { AdminFaqClient } from "./AdminFaqClient";

export const metadata = createPageMetadata({
  title: "Admin FAQ",
  description: "Gestão de perguntas frequentes.",
  path: "/admin/faq",
  noIndex: true
});

export default function AdminFaqPage() {
  return <AdminFaqClient />;
}

