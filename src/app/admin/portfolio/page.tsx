import { createPageMetadata } from "@/lib/metadata";
import { AdminPortfolioClient } from "./AdminPortfolioClient";

export const metadata = createPageMetadata({
  title: "Admin Portfólio",
  description: "Gestão dos itens de portfólio cadastrados.",
  path: "/admin/portfolio",
  noIndex: true
});

export default function AdminPortfolioPage() {
  return <AdminPortfolioClient />;
}

