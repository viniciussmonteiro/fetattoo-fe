import Link from "next/link";
import styles from "./PortfolioFilters.module.css";
import type { PortfolioCategory } from "@/data/portfolio";
import { portfolioCategories } from "@/data/portfolio";

type PortfolioFiltersProps = {
  selectedCategory: "Todas" | PortfolioCategory;
  healedOnly: boolean;
  beforeAfterOnly: boolean;
};

function buildHref(
  category: "Todas" | PortfolioCategory,
  healedOnly: boolean,
  beforeAfterOnly: boolean
): string {
  const params = new URLSearchParams();

  if (category !== "Todas") {
    params.set("categoria", category);
  }

  if (healedOnly) {
    params.set("healed", "1");
  }

  if (beforeAfterOnly) {
    params.set("beforeAfter", "1");
  }

  const query = params.toString();
  return query ? `/portfolio?${query}` : "/portfolio";
}

export function PortfolioFilters({ selectedCategory, healedOnly, beforeAfterOnly }: PortfolioFiltersProps) {
  return (
    <section className={styles.wrap} aria-label="Filtros da galeria">
      <div className={styles.group}>
        {portfolioCategories.map((category) => {
          const active = category === selectedCategory;
          return (
            <Link
              key={category}
              href={buildHref(category, healedOnly, beforeAfterOnly)}
              className={`${styles.filter} ${active ? styles.active : ""}`.trim()}
              aria-current={active ? "page" : undefined}
            >
              {category}
            </Link>
          );
        })}
      </div>

      <div className={styles.group}>
        <Link
          href={buildHref(selectedCategory, !healedOnly, beforeAfterOnly)}
          className={`${styles.filter} ${healedOnly ? styles.active : ""}`.trim()}
          aria-pressed={healedOnly}
        >
          Apenas cicatrizadas
        </Link>
        <Link
          href={buildHref(selectedCategory, healedOnly, !beforeAfterOnly)}
          className={`${styles.filter} ${beforeAfterOnly ? styles.active : ""}`.trim()}
          aria-pressed={beforeAfterOnly}
        >
          Apenas antes/depois
        </Link>
        <Link href="/portfolio" className={styles.filter}>
          Limpar filtros
        </Link>
      </div>
    </section>
  );
}
