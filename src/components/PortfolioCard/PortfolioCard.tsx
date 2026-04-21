import styles from "./PortfolioCard.module.css";
import Image from "next/image";
import type { PortfolioItem } from "@/data/portfolio";

type PortfolioCardProps = {
  item: PortfolioItem;
  priority?: boolean;
};

export function PortfolioCard({ item, priority = false }: PortfolioCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        <Image
          src={item.image}
          alt={item.alt}
          fill
          {...(priority ? { priority: true } : { loading: "lazy" })}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.media}
        />
        <div className={styles.badges}>
          {item.featured ? <span className={styles.badge}>Destaque</span> : null}
          {item.healed ? <span className={styles.badge}>Cicatrizada</span> : <span className={styles.badge}>Recém-feita</span>}
          {item.beforeAfter ? <span className={styles.badge}>Antes/Depois</span> : null}
          {item.closeUp ? <span className={styles.badge}>Close</span> : null}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.meta}>
          <span>{item.category}</span>
          <span>{item.bodyPart}</span>
          <span>{item.technique}</span>
        </p>
      </div>
    </article>
  );
}
