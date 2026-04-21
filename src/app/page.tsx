import styles from "./page.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { artistProfile } from "@/data/artist";
import { Hero } from "@/components/Hero/Hero";
import { FeaturedStyles } from "@/components/FeaturedStyles/FeaturedStyles";
import { HomePortfolioPreview } from "@/components/HomePortfolioPreview/HomePortfolioPreview";
import { AboutPreview } from "@/components/AboutPreview/AboutPreview";
import { ServiceSection } from "@/components/ServiceSection/ServiceSection";
import { ProcessSteps } from "@/components/ProcessSteps/ProcessSteps";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { FAQPreview } from "@/components/FAQPreview/FAQPreview";
import { CTASection } from "@/components/CTASection/CTASection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";

export const metadata = createPageMetadata({
  title: "Portfólio de Tatuagem em São Paulo",
  description:
    "Ana Noir Tattoo em São Paulo: fine line, blackwork e floral com foco em tatuagens autorais, atendimento profissional e agendamento fácil.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <Hero
        name={artistProfile.name}
        tagline={artistProfile.tagline}
        description={artistProfile.bioShort}
        city={artistProfile.city}
        stylesLabel={artistProfile.tagline}
        availability={artistProfile.availability}
        imageSrc={artistProfile.heroImage.src}
        imageAlt={artistProfile.heroImage.alt}
      />

      <FeaturedStyles />
      <HomePortfolioPreview />
      <AboutPreview />

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

      <FAQPreview />

      <section className="section">
        <div className="container flow">
          <CTASection
            title="Pronta para criar uma tatuagem com identidade artística?"
            description="Fale comigo para orçamento, agenda e orientações de preparação. Respondo com briefing, faixa de valor e próximos passos."
          />

          <article className={styles.quickContact} aria-label="Contato rápido">
            <h2>Contato rápido com WhatsApp e Instagram</h2>
            <p>Atendimento via WhatsApp, Instagram e e-mail profissional.</p>
            <SocialLinks />
          </article>
        </div>
      </section>
    </>
  );
}
