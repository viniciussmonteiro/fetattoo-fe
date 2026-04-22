import { createPageMetadata } from "@/lib/metadata";
import { AdminPortfolioNewClient } from "./AdminPortfolioNewClient";

export const metadata = createPageMetadata({
  title: "Novo item de portfólio",
  description: "Cadastro de novo trabalho de tatuagem no painel.",
  path: "/admin/portfolio/novo",
  noIndex: true
});

export default function AdminPortfolioNewPage() {
  return <AdminPortfolioNewClient />;
}

