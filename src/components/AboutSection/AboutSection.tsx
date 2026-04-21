import Image from "next/image";
import Link from "next/link";
import styles from "./AboutSection.module.css";
import { artistProfile } from "@/data/artist";

type AboutSectionProps = {
  compact?: boolean;
};

export function AboutSection({ compact = false }: AboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="about-section-title">
      <div className={styles.mediaWrap}>
        <Image
          src={artistProfile.portraitImage.src}
          alt={artistProfile.portraitImage.alt}
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
        <p className={styles.text}>{artistProfile.bioLong}</p>

        {!compact ? (
          <>
            <p className={styles.text}>
              Atendo em estúdio privado na {artistProfile.neighborhood}, com agenda organizada para oferecer experiência completa:
              conceito, desenho, sessão e acompanhamento de cicatrização.
            </p>
            <ul className={styles.highlights}>
              <li>+{artistProfile.experienceYears} anos de experiência com projetos autorais</li>
              <li>Especialidade em linhas finas, contraste e composição botânica</li>
              <li>Atendimento com hora marcada e orientação pré/pós sessão</li>
            </ul>
          </>
        ) : null}

        <div className={styles.actions}>
          <Link href="/sobre" className={styles.link}>
            Conhecer trajetória completa
          </Link>
          <a href={artistProfile.instagramUrl} target="_blank" rel="noreferrer" className={styles.link}>
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
