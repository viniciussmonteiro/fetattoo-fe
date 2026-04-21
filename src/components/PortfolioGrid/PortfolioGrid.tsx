import styles from "./PortfolioGrid.module.css";
import { PortfolioCard } from "@/components/PortfolioCard/PortfolioCard";
import type { PortfolioItem } from "@/data/portfolio";

type PortfolioGridProps = {
  items: PortfolioItem[];
  eagerCount?: number;
};

export function PortfolioGrid({ items, eagerCount = 0 }: PortfolioGridProps) {
  if (!items.length) {
    return (
      <div className={styles.empty} role="status">
        Nenhum trabalho encontrado para este filtro. Tente outra combinação.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <PortfolioCard key={item.id} item={item} priority={index < eagerCount} />
      ))}
    </div>
  );
}
