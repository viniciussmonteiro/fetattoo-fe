import Image from "next/image";
import styles from "./contato.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { Button } from "@/components/Button/Button";
import { getArtistProfile, getSocialLinks } from "@/lib/repositories/content-repository";

export const metadata = createPageMetadata({
  title: "Agendamento e Contato",
  description:
    "Agende sua sessão com Fernanda Borges: formulário de orçamento, WhatsApp, Instagram, TikTok e Threads.",
  path: "/contato"
});

export default async function ContatoPage() {
  const [artistProfile, socialLinks] = await Promise.all([getArtistProfile(), getSocialLinks()]);

  return (
    <>
      <section className="pageIntro">
        <div className={`container ${styles.intro}`}>
          <span className="eyebrow">Agendamento / contato</span>
          <h1 className="sectionTitle">Vamos planejar sua próxima tatuagem</h1>
          <p className="sectionLead">
            Envie sua ideia para receber orçamento, prazo estimado e orientações para a sessão. Atendimento com hora marcada.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <article className={styles.infoCard}>
            <h2>Canais de atendimento</h2>
            <p>
              WhatsApp: <a href={artistProfile.whatsappUrl}>falar agora</a>
            </p>
            <p>
              E-mail: <a href={`mailto:${artistProfile.email}`}>{artistProfile.email}</a>
            </p>
            <p>
              Local: {artistProfile.neighborhood}, {artistProfile.city}
            </p>
            <p>Horário: {artistProfile.workingHours}</p>
            <SocialLinks direction="column" links={socialLinks} />
            <Button href={artistProfile.whatsappUrl} target="_blank" rel="noreferrer" variant="primary">
              Agendar pelo WhatsApp
            </Button>
          </article>

          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.mapCard}`}>
          <div>
            <h2>Atendimento em Pinheiros, SP</h2>
            <p>
              Local de fácil acesso na {artistProfile.neighborhood}. Endereço completo compartilhado após confirmação do
              agendamento.
            </p>
            <a href={artistProfile.mapUrl} target="_blank" rel="noreferrer" className={styles.mapLink}>
              Ver região no mapa
            </a>
          </div>

          <div className={styles.mapImageWrap}>
            <Image
              src="/images/map-studio.svg"
              alt="Mapa ilustrativo da região de Pinheiros em São Paulo"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
