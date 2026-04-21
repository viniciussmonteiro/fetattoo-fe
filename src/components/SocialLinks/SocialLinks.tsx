import styles from "./SocialLinks.module.css";
import { siteConfig } from "@/app/globals";

type SocialLinksProps = {
  direction?: "row" | "column";
};

export function SocialLinks({ direction = "row" }: SocialLinksProps) {
  return (
    <ul className={`${styles.list} ${direction === "column" ? styles.column : ""}`.trim()} aria-label="Redes sociais">
      <li>
        <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className={styles.link}>
          Instagram
        </a>
      </li>
      <li>
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className={styles.link}>
          WhatsApp
        </a>
      </li>
      <li>
        <a href={`mailto:${siteConfig.email}`} className={styles.link}>
          E-mail
        </a>
      </li>
    </ul>
  );
}
