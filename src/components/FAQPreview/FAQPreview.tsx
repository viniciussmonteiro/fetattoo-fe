import Link from "next/link";
import { faqItems as fallbackFaqItems, type FAQItem } from "@/data/faq";
import { FAQAccordion } from "@/components/FAQAccordion/FAQAccordion";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import styles from "./FAQPreview.module.css";

type FAQPreviewProps = {
  items?: FAQItem[];
};

export function FAQPreview({ items = fallbackFaqItems }: FAQPreviewProps) {
  return (
    <section className="section" aria-labelledby="faq-preview-title">
      <div className="container flow">
        <SectionTitle id="faq-preview-title" eyebrow="FAQ resumido" title="Dúvidas frequentes antes de agendar" />
        <FAQAccordion items={items} limit={5} />
        <Link href="/faq" className={styles.link}>
          Ver FAQ completo
        </Link>
      </div>
    </section>
  );
}
