import Link from "next/link";
import styles from "./Header.module.css";
import { navigationLinks, artistProfile as fallbackArtistProfile, type ArtistProfile } from "@/data/artist";
import { Button } from "@/components/Button/Button";

type HeaderProps = {
  profile?: ArtistProfile;
};

export function Header({ profile = fallbackArtistProfile }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Ir para página inicial">
          <span className={styles.brandName}>{profile.name}</span>
          <span className={styles.brandTag}>{profile.tagline}</span>
        </Link>

        <nav className={styles.nav} aria-label="Menu principal">
          {navigationLinks.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.ctaWrap}>
          <Button href="/contato" variant="primary" ariaLabel="Abrir página de agendamento">
            Agendar sessão
          </Button>
        </div>
      </div>
    </header>
  );
}
