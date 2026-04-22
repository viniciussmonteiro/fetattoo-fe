import { createPageMetadata } from "@/lib/metadata";
import type { PortfolioCategory } from "@/data/portfolio";
import { PortfolioHero } from "@/components/PortfolioHero/PortfolioHero";
import { PortfolioFilters } from "@/components/PortfolioFilters/PortfolioFilters";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";
import { CTASection } from "@/components/CTASection/CTASection";
import { listPortfolioCategories, listPortfolioItems } from "@/lib/repositories/portfolio-repository";

export const metadata = createPageMetadata({
  title: "Portfólio",
  description:
    "Galeria profissional de tatuagens da Fernanda Borges com foco em Blackwork e Black & Red, com filtros por categoria e técnica.",
  path: "/portfolio"
});

type PortfolioPageProps = {
  searchParams?: Promise<{
    categoria?: string;
    healed?: string;
    beforeAfter?: string;
    destaque?: string;
  }>;
};

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const resolvedSearchParams = await searchParams;
  const categories = await listPortfolioCategories();

  const requestedCategory = resolvedSearchParams?.categoria;
  const selectedCategory = requestedCategory && categories.includes(requestedCategory as "Todas" | PortfolioCategory)
    ? (requestedCategory as "Todas" | PortfolioCategory)
    : "Todas";

  const healedOnly = resolvedSearchParams?.healed === "1";
  const beforeAfterOnly = resolvedSearchParams?.beforeAfter === "1";
  const featuredOnly = resolvedSearchParams?.destaque === "1";

  const filteredItems = await listPortfolioItems({
    ...(selectedCategory !== "Todas" ? { category: selectedCategory } : {}),
    ...(healedOnly ? { healed: true } : {}),
    ...(beforeAfterOnly ? { beforeAfter: true } : {}),
    ...(featuredOnly ? { featured: true } : {})
  });

  return (
    <>
      <PortfolioHero total={filteredItems.length} />

      <section className="section">
        <div className="container flow">
          <PortfolioFilters
            selectedCategory={selectedCategory}
            categories={categories}
            healedOnly={healedOnly}
            beforeAfterOnly={beforeAfterOnly}
            featuredOnly={featuredOnly}
          />
          <PortfolioGrid items={filteredItems} eagerCount={2} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CTASection
            title="Gostou de algum estilo da galeria?"
            description="Me envie referências e região do corpo para receber orçamento alinhado ao seu projeto."
          />
        </div>
      </section>
    </>
  );
}
