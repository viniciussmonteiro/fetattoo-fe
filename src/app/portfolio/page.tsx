import styles from "./portfolio.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { portfolioCategories, portfolioItems, type PortfolioCategory } from "@/data/portfolio";
import { PortfolioFilters } from "@/components/PortfolioFilters/PortfolioFilters";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";
import { CTASection } from "@/components/CTASection/CTASection";

export const metadata = createPageMetadata({
  title: "Portfólio",
  description:
    "Galeria profissional de tatuagens da Ana Noir Tattoo com filtros por estilo, técnica e região do corpo.",
  path: "/portfolio"
});

type PortfolioPageProps = {
  searchParams?: {
    categoria?: string;
    healed?: string;
    beforeAfter?: string;
  };
};

function isValidCategory(value: string | undefined): value is "Todas" | PortfolioCategory {
  return !!value && portfolioCategories.includes(value as "Todas" | PortfolioCategory);
}

export default function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const selectedCategory = isValidCategory(searchParams?.categoria) ? searchParams.categoria : "Todas";
  const healedOnly = searchParams?.healed === "1";
  const beforeAfterOnly = searchParams?.beforeAfter === "1";

  const filteredItems = portfolioItems.filter((item) => {
    const matchCategory = selectedCategory === "Todas" ? true : item.category === selectedCategory;
    const matchHealed = healedOnly ? item.healed : true;
    const matchBeforeAfter = beforeAfterOnly ? item.beforeAfter : true;
    return matchCategory && matchHealed && matchBeforeAfter;
  });

  return (
    <>
      <section className="pageIntro">
        <div className={`container ${styles.intro}`}>
          <span className="eyebrow">Portfólio completo</span>
          <h1 className="sectionTitle">Galeria autoral com foco em técnica e composição</h1>
          <p className="sectionLead">
            Navegue por categorias como fine line, blackwork, floral, anime e projetos maiores. Cada card mostra estilo, região do
            corpo e técnica aplicada.
          </p>
          <p className={styles.counter}>Mostrando {filteredItems.length} trabalhos</p>
        </div>
      </section>

      <section className="section">
        <div className={`container flow ${styles.wrapper}`}>
          <PortfolioFilters selectedCategory={selectedCategory} healedOnly={healedOnly} beforeAfterOnly={beforeAfterOnly} />
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
