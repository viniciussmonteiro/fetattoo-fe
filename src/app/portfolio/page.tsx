import { createPageMetadata } from "@/lib/metadata";
import { portfolioCategories, portfolioItems, type PortfolioCategory } from "@/data/portfolio";
import { PortfolioHero } from "@/components/PortfolioHero/PortfolioHero";
import { PortfolioFilters } from "@/components/PortfolioFilters/PortfolioFilters";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";
import { CTASection } from "@/components/CTASection/CTASection";

export const metadata = createPageMetadata({
  title: "Portfólio",
  description:
    "Galeria profissional de tatuagens da Ana Noir Tattoo com filtros por estilo, técnica, região do corpo e destaques.",
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

function isValidCategory(value: string | undefined): value is "Todas" | PortfolioCategory {
  return !!value && portfolioCategories.includes(value as "Todas" | PortfolioCategory);
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const resolvedSearchParams = await searchParams;

  const selectedCategory = isValidCategory(resolvedSearchParams?.categoria)
    ? resolvedSearchParams.categoria
    : "Todas";
  const healedOnly = resolvedSearchParams?.healed === "1";
  const beforeAfterOnly = resolvedSearchParams?.beforeAfter === "1";
  const featuredOnly = resolvedSearchParams?.destaque === "1";

  const filteredItems = portfolioItems.filter((item) => {
    const matchCategory = selectedCategory === "Todas" ? true : item.category === selectedCategory;
    const matchHealed = healedOnly ? item.healed : true;
    const matchBeforeAfter = beforeAfterOnly ? item.beforeAfter : true;
    const matchFeatured = featuredOnly ? !!item.featured : true;
    return matchCategory && matchHealed && matchBeforeAfter && matchFeatured;
  });

  return (
    <>
      <PortfolioHero total={filteredItems.length} />

      <section className="section">
        <div className="container flow">
          <PortfolioFilters
            selectedCategory={selectedCategory}
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
