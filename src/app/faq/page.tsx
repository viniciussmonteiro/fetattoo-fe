import Link from "next/link";
import styles from "./faq.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { faqItems } from "@/data/faq";
import { FAQAccordion } from "@/components/FAQAccordion/FAQAccordion";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: "Perguntas frequentes sobre orçamento, sinal, retoque, sessão, cuidados e funcionamento do atendimento.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <>
      <section className="pageIntro">
        <div className={`container ${styles.intro}`}>
          <span className="eyebrow">FAQ</span>
          <h1 className="sectionTitle">Perguntas frequentes</h1>
          <p className="sectionLead">
            Tudo que você precisa saber antes de agendar sua sessão: orçamento, política de sinal, preparação e cuidados.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container flow">
          <FAQAccordion items={faqItems} />
          <Link href="/contato" className={styles.link}>
            Ainda com dúvidas? Falar no agendamento
          </Link>
        </div>
      </section>
    </>
  );
}
