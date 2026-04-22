import { createPageMetadata } from "@/lib/metadata";
import { AdminBioClient } from "./AdminBioClient";

export const metadata = createPageMetadata({
  title: "Admin Bio",
  description: "Gestão da biografia da artista.",
  path: "/admin/bio",
  noIndex: true
});

export default function AdminBioPage() {
  return <AdminBioClient />;
}

