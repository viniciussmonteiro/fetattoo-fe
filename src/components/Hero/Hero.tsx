import Image from "next/image";
import styles from "./Hero.module.css";
import { Button } from "@/components/Button/Button";

type HeroProps = {
  name: string;
  tagline: string;
  description: string;
  city: string;
  stylesLabel: string;
  availability: string;
  imageSrc: string;
  imageAlt: string;
};

export function Hero({
  name,
  tagline,
  description,
  city,
  stylesLabel,
  availability,
  imageSrc,
  imageAlt
}: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <span className="eyebrow">Portfólio profissional de tatuagem</span>
          <h1 id="hero-title" className={styles.title}>
            {name}
          </h1>
          <p className={styles.tagline}>{tagline}</p>
          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Button href="/contato" variant="primary">
              Agendar sessão
            </Button>
            <Button href="/portfolio" variant="secondary">
              Ver portfólio
            </Button>
          </div>

          <ul className={styles.highlights} aria-label="Informações rápidas">
            <li>
              <strong>Cidade</strong>
              <span>{city}</span>
            </li>
            <li>
              <strong>Estilos</strong>
              <span>{stylesLabel}</span>
            </li>
            <li>
              <strong>Disponibilidade</strong>
              <span>{availability}</span>
            </li>
          </ul>
        </div>

        <div className={styles.mediaWrap}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            priority
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={styles.media}
          />
        </div>
      </div>
    </section>
  );
}
