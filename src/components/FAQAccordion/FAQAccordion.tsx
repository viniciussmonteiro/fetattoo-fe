import styles from "./FAQAccordion.module.css";
import type { FAQItem } from "@/data/faq";

type FAQAccordionProps = {
  items: FAQItem[];
  limit?: number;
};

export function FAQAccordion({ items, limit }: FAQAccordionProps) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <div className={styles.list}>
      {visibleItems.map((item) => (
        <details key={item.id} className={styles.item}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
