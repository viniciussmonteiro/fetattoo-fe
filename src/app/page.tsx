import Link from "next/link";
import styles from "./page.module.css";
import { Hero } from "@/components/Hero/Hero";
import { AboutSection } from "@/components/AboutSection/AboutSection";
import { ProcessSteps } from "@/components/ProcessSteps/ProcessSteps";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { ServiceSection } from "@/components/ServiceSection/ServiceSection";
import { FAQAccordion } from "@/components/FAQAccordion/FAQAccordion";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";
import { CTASection } from "@/components/CTASection/CTASection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { faqItems } from "@/data/faq";
import { portfolioItems } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "Ana Noir Tattoo em São Paulo: fine line, blackwork e floral com foco em tatuagens autorais, atendimento profissional e agendamento fácil.",
  path: "/"
});

export default function HomePage() {
  const featuredWorks = portfolioItems.slice(0, 6);

  return (
    <>
      <Hero
        name="Ana Noir Tattoo"
        tagline="Fine line, blackwork e floral"
        description="Tatuagens autorais com traço delicado, composição elegante e identidade artística."
        city="São Paulo"
        stylesLabel="Fine line, blackwork, floral"
        availability="Agenda mensal aberta"
        imageSrc="/images/hero-studio.svg"
        imageAlt="Ambiente de estúdio de tatuagem com foco no processo artístico"
      />

      <section className="section">
        <div className="container flow">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Prévia da galeria</span>
            <h2 className="sectionTitle">Trabalhos recentes em destaque</h2>
            <p className="sectionLead">
              Galeria pensada para mostrar qualidade de linha, leitura de composição e diferentes estágios das tatuagens.
            </p>
          </div>

          <PortfolioGrid items={featuredWorks} eagerCount={2} />

          <Link href="/portfolio" className={styles.inlineLink}>
            Ver portfólio completo
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AboutSection compact />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ServiceSection title="Estilos, projetos autorais e alinhamento de proposta" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProcessSteps />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      <section className="section">
        <div className="container flow">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">FAQ resumido</span>
            <h2 className="sectionTitle">Dúvidas frequentes antes de agendar</h2>
          </div>
          <FAQAccordion items={faqItems} limit={5} />
          <Link href="/faq" className={styles.inlineLink}>
            Ver FAQ completo
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container flow">
          <CTASection
            title="Pronta para criar uma tatuagem com identidade artística?"
            description="Fale comigo para orçamento, agenda e orientações de preparação. Respondo com briefing, faixa de valor e próximos passos."
          />

          <article className={styles.quickContact} aria-label="Contato rápido">
            <h2>Contato rápido</h2>
            <p>Atendimento via WhatsApp, Instagram e e-mail profissional.</p>
            <SocialLinks />
          </article>
        </div>
      </section>
    </>
  );
}
