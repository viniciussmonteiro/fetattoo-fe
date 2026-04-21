import Link from "next/link";
import { faqItems } from "@/data/faq";
import { FAQAccordion } from "@/components/FAQAccordion/FAQAccordion";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import styles from "./FAQPreview.module.css";

export function FAQPreview() {
  return (
    <section className="section" aria-labelledby="faq-preview-title">
      <div className="container flow">
        <SectionTitle id="faq-preview-title" eyebrow="FAQ resumido" title="Dúvidas frequentes antes de agendar" />
        <FAQAccordion items={faqItems} limit={5} />
        <Link href="/faq" className={styles.link}>
          Ver FAQ completo
        </Link>
      </div>
    </section>
  );
}
