import Image from "next/image";
import styles from "./contato.module.css";
import { createPageMetadata } from "@/lib/metadata";
import { artistProfile } from "@/data/artist";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { Button } from "@/components/Button/Button";

export const metadata = createPageMetadata({
  title: "Agendamento e Contato",
  description:
    "Agende sua sessão com Ana Noir Tattoo: formulário de orçamento, WhatsApp, Instagram, e-mail e informações do estúdio.",
  path: "/contato"
});

export default function ContatoPage() {
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
            <SocialLinks direction="column" />
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
            <h2>Estúdio em São Paulo</h2>
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
              alt="Mapa ilustrativo da região da Vila Mariana em São Paulo"
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
