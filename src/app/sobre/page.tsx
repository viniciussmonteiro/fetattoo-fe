import styles from "./sobre.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { artistProfile } from "@/data/artist";
import { AboutSection } from "@/components/AboutSection/AboutSection";
import { ServiceSection } from "@/components/ServiceSection/ServiceSection";
import { CTASection } from "@/components/CTASection/CTASection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";

export const metadata = createPageMetadata({
  title: "Sobre",
  description:
    "Conheça a trajetória, referências artísticas e forma de atendimento da tatuadora Ana Noir Tattoo em São Paulo.",
  path: "/sobre"
});

export default function SobrePage() {
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
          <AboutSection />
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.highlights}`}>
          <article className={styles.card}>
            <h2>Experiência</h2>
            <p>
              Mais de {artistProfile.experienceYears} anos no mercado com foco em execução limpa, atendimento transparente e
              construção de projetos em etapas quando necessário.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Inspiração artística</h2>
            <p>{artistProfile.inspirations.join(", ")}. O objetivo é criar peças delicadas e marcantes ao mesmo tempo.</p>
          </article>
          <article className={styles.card}>
            <h2>Atendimento em {artistProfile.city}</h2>
            <p>
              Estúdio localizado na {artistProfile.neighborhood}, com ambiente reservado, assepsia rigorosa e agenda por horário
              para melhor experiência.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.socialCard}`}>
          <h2>Redes e contato profissional</h2>
          <p>Conheça bastidores, trabalhos recentes e datas de agenda diretamente nos canais oficiais.</p>
          <SocialLinks />
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
