import Link from "next/link";
import styles from "./Header.module.css";
import { navigationLinks, siteConfig } from "@/app/globals";
import { Button } from "@/components/Button/Button";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Ir para página inicial">
          <span className={styles.brandName}>{siteConfig.name}</span>
          <span className={styles.brandTag}>Fine line, blackwork e floral</span>
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
