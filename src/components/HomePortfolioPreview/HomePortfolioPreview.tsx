import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import styles from "./HomePortfolioPreview.module.css";

export function HomePortfolioPreview() {
  const items = portfolioItems.filter((item) => item.featured).slice(0, 6);

  return (
    <section className="section" aria-labelledby="home-portfolio-title">
      <div className="container flow">
        <SectionTitle
          id="home-portfolio-title"
          eyebrow="Prévia da galeria"
          title="Trabalhos recentes em destaque"
          description="Galeria pensada para mostrar qualidade de linha, leitura de composição e estágios diferentes da tatuagem."
        />

        <PortfolioGrid items={items} eagerCount={2} />

        <Link href="/portfolio" className={styles.link}>
          Ver portfólio completo
        </Link>
      </div>
    </section>
  );
}
