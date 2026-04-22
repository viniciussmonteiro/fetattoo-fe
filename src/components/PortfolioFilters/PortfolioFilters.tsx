import Link from "next/link";
import styles from "./PortfolioFilters.module.css";
import type { PortfolioCategory } from "@/data/portfolio";

type PortfolioFiltersProps = {
  selectedCategory: "Todas" | PortfolioCategory;
  categories: Array<"Todas" | PortfolioCategory>;
  healedOnly: boolean;
  beforeAfterOnly: boolean;
  featuredOnly: boolean;
};

function buildHref(
  category: "Todas" | PortfolioCategory,
  healedOnly: boolean,
  beforeAfterOnly: boolean,
  featuredOnly: boolean
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

  if (featuredOnly) {
    params.set("destaque", "1");
  }

  const query = params.toString();
  return query ? `/portfolio?${query}` : "/portfolio";
}

export function PortfolioFilters({
  selectedCategory,
  categories,
  healedOnly,
  beforeAfterOnly,
  featuredOnly
}: PortfolioFiltersProps) {
  return (
    <section className={styles.wrap} aria-label="Filtros da galeria">
      <div className={styles.group}>
        {categories.map((category) => {
          const active = category === selectedCategory;
          return (
            <Link
              key={category}
              href={buildHref(category, healedOnly, beforeAfterOnly, featuredOnly)}
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
          href={buildHref(selectedCategory, !healedOnly, beforeAfterOnly, featuredOnly)}
          className={`${styles.filter} ${healedOnly ? styles.active : ""}`.trim()}
          aria-pressed={healedOnly}
        >
          Apenas cicatrizadas
        </Link>
        <Link
          href={buildHref(selectedCategory, healedOnly, !beforeAfterOnly, featuredOnly)}
          className={`${styles.filter} ${beforeAfterOnly ? styles.active : ""}`.trim()}
          aria-pressed={beforeAfterOnly}
        >
          Apenas antes/depois
        </Link>
        <Link
          href={buildHref(selectedCategory, healedOnly, beforeAfterOnly, !featuredOnly)}
          className={`${styles.filter} ${featuredOnly ? styles.active : ""}`.trim()}
          aria-pressed={featuredOnly}
        >
          Apenas destaque
        </Link>
        <Link href="/portfolio" className={styles.filter}>
          Limpar filtros
        </Link>
      </div>
    </section>
  );
}
