import styles from "./sobre.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { AboutSection } from "@/components/AboutSection/AboutSection";
import { ServiceSection } from "@/components/ServiceSection/ServiceSection";
import { CTASection } from "@/components/CTASection/CTASection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { getArtistProfile, getSocialLinks } from "@/lib/repositories/content-repository";

export const metadata = createPageMetadata({
  title: "Sobre",
  description:
    "Conheça a linguagem artística e o formato de atendimento da tatuadora Fernanda Borges em Pinheiros, SP.",
  path: "/sobre"
});

export default async function SobrePage() {
  const [artistProfile, socialLinks] = await Promise.all([getArtistProfile(), getSocialLinks()]);

  return (
    <>
      <section className="pageIntro">
        <div className={`container ${styles.intro}`}>
          <span className="eyebrow">Sobre a artista</span>
          <h1 className="sectionTitle">Arte autoral com linguagem elegante e contemporânea</h1>
          <p className="sectionLead">
            {artistProfile.name} desenvolve tatuagens personalizadas para pessoas que buscam estética refinada, leitura clara e
            composição pensada para o corpo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AboutSection profile={artistProfile} />
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.highlights}`}>
          <article className={styles.card}>
            <h2>Experiência</h2>
            <p>
              {artistProfile.experienceSummary}
            </p>
          </article>
          <article className={styles.card}>
            <h2>Inspiração artística</h2>
            <p>{artistProfile.inspirations.join(", ")}. O objetivo é criar peças delicadas e marcantes ao mesmo tempo.</p>
          </article>
          <article className={styles.card}>
            <h2>
              Atendimento em {artistProfile.neighborhood}, {artistProfile.city}
            </h2>
            <p>
              Atendimento na região de {artistProfile.neighborhood}, com ambiente reservado, assepsia rigorosa e agenda por
              horário para melhor experiência.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.socialCard}`}>
          <h2>Redes e contato profissional</h2>
          <p>Conheça bastidores, trabalhos recentes e datas de agenda diretamente nos canais oficiais.</p>
          <SocialLinks links={socialLinks} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ServiceSection />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CTASection
            title="Quer conversar sobre uma ideia personalizada?"
            description="Explique seu conceito e receba orientação sobre formato, escala, orçamento e disponibilidade."
          />
        </div>
      </section>
    </>
  );
}
