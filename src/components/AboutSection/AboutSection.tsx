import Image from "next/image";
import Link from "next/link";
import styles from "./AboutSection.module.css";
import { artistProfile as fallbackArtistProfile, type ArtistProfile } from "@/data/artist";

type AboutSectionProps = {
  compact?: boolean;
  profile?: ArtistProfile;
};

export function AboutSection({ compact = false, profile = fallbackArtistProfile }: AboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="about-section-title">
      <div className={styles.mediaWrap}>
          <Image
          src={profile.portraitImage.src}
          alt={profile.portraitImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className={styles.media}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <span className="eyebrow">Sobre a artista</span>
        <h2 id="about-section-title" className={styles.title}>
          Traço autoral, atendimento humano e técnica consistente
        </h2>
        <p className={styles.text}>{profile.bioLong}</p>

        {!compact ? (
          <>
            <p className={styles.text}>
              Atendo em estúdio privado em {profile.neighborhood}, com agenda organizada para oferecer experiência
              completa: conceito, desenho, sessão e acompanhamento de cicatrização.
            </p>
            <ul className={styles.highlights}>
              <li>{profile.experienceSummary}</li>
              <li>Especialidade em composições de alto contraste em Blackwork e Black & Red</li>
              <li>Atendimento com hora marcada e orientação pré/pós sessão</li>
            </ul>
          </>
        ) : null}

        <div className={styles.actions}>
          <Link href="/sobre" className={styles.link}>
            Conhecer trajetória completa
          </Link>
          <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className={styles.link}>
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
