import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { portfolioItems } from "@/data/portfolio";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";

export const metadata = createPageMetadata({
  title: "Admin Portfólio",
  description: "Gestão dos itens de portfólio cadastrados.",
  path: "/admin/portfolio",
  noIndex: true
});

export default function AdminPortfolioPage() {
  const rows = portfolioItems.map((item) => [
    item.title,
    item.category,
    item.bodyPart,
    <StatusBadge key={`status-${item.id}`} status={item.featured ? "published" : "draft"} />,
    <Link key={`link-${item.id}`} href={`/admin/portfolio/${item.id}`}>
      Editar
    </Link>
  ]);

  return (
    <div className="flow">
      <Link href="/admin/portfolio/novo" className="chip">
        + Novo item
      </Link>
      <AdminTable
        caption="Lista de tatuagens cadastradas"
        headers={["Título", "Categoria", "Região", "Status", "Ação"]}
        rows={rows}
      />
    </div>
  );
}
