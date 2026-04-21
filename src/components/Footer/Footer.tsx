import Link from "next/link";
import styles from "./Footer.module.css";
import { navigationLinks, siteConfig } from "@/app/globals";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <section className={styles.col} aria-label="Informações da artista">
          <h2 className={styles.title}>{siteConfig.name}</h2>
          <p className={styles.text}>
            Estúdio em {siteConfig.neighborhood}, {siteConfig.city}. Atendimento com hora marcada e projeto personalizado.
          </p>
          <SocialLinks />
        </section>

        <section className={styles.col} aria-label="Navegação">
          <h2 className={styles.title}>Navegação</h2>
          <ul className={styles.linkList}>
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/flash" className={styles.link}>
                Flash disponíveis
              </Link>
            </li>
            <li>
              <Link href="/autorais" className={styles.link}>
                Projetos autorais
              </Link>
            </li>
            <li>
              <Link href="/blog" className={styles.link}>
                Blog / novidades
              </Link>
            </li>
          </ul>
        </section>

        <section className={styles.col} aria-label="Políticas">
          <h2 className={styles.title}>Contato e políticas</h2>
          <ul className={styles.linkList}>
            <li>
              <a className={styles.link} href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp: {siteConfig.phone}
              </a>
            </li>
            <li>
              <a className={styles.link} href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <Link href="/cuidados" className={styles.link}>
                Política de privacidade e cuidados
              </Link>
            </li>
            <li>
              <Link href="/contato" className={styles.link}>
                Termos de agendamento / política de sinal
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copyright}>© {year} {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
