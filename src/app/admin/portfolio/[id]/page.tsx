import { createPageMetadata } from "@/lib/metadata";
import { AdminPortfolioItemClient } from "./AdminPortfolioItemClient";

type PortfolioItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PortfolioItemPageProps) {
  const { id } = await params;

  return createPageMetadata({
    title: `Editar item #${id}`,
    description: "Edição de item de portfólio no painel administrativo.",
    path: `/admin/portfolio/${id}`,
    noIndex: true
  });
}

export default async function AdminPortfolioItemPage({ params }: PortfolioItemPageProps) {
  const { id } = await params;
  return <AdminPortfolioItemClient id={id} />;
}

