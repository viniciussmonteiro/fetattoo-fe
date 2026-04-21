import Image from "next/image";
import Link from "next/link";
import styles from "./AboutSection.module.css";

type AboutSectionProps = {
  compact?: boolean;
};

export function AboutSection({ compact = false }: AboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="about-section-title">
      <div className={styles.mediaWrap}>
        <Image
          src="/images/artist-portrait.svg"
          alt="Retrato profissional da tatuadora Ana Noir no estúdio"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className={styles.media}
        />
      </div>

      <div className={styles.content}>
        <span className="eyebrow">Sobre a artista</span>
        <h2 id="about-section-title" className={styles.title}>
          Traço autoral, atendimento humano e técnica consistente
        </h2>
        <p className={styles.text}>
          Sou Ana Noir, tatuadora em São Paulo com foco em fine line, blackwork e floral contemporâneo. Cada projeto nasce de um
          briefing cuidadoso para traduzir história pessoal em composição elegante e atemporal.
        </p>

        {!compact ? (
          <>
            <p className={styles.text}>
              Atendo em estúdio privado na Vila Mariana, com agenda organizada para oferecer experiência completa: conceito,
              desenho, sessão e acompanhamento de cicatrização.
            </p>
            <ul className={styles.highlights}>
              <li>+7 anos de experiência com projetos autorais</li>
              <li>Especialidade em linhas finas, contraste e composição botânica</li>
              <li>Atendimento com hora marcada e orientação pré/pós sessão</li>
            </ul>
          </>
        ) : null}

        <div className={styles.actions}>
          <Link href="/sobre" className={styles.link}>
            Conhecer trajetória completa
          </Link>
          <a href="https://instagram.com/ananoirtattoo" target="_blank" rel="noreferrer" className={styles.link}>
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
