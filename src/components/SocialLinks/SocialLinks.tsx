import styles from "./SocialLinks.module.css";
import { socialLinks } from "@/data/socialLinks";

type SocialLinksProps = {
  direction?: "row" | "column";
};

export function SocialLinks({ direction = "row" }: SocialLinksProps) {
  return (
    <ul className={`${styles.list} ${direction === "column" ? styles.column : ""}`.trim()} aria-label="Redes sociais">
      {socialLinks.map((link) => {
        const isExternal = link.href.startsWith("http");

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={styles.link}
            >
              {link.shortLabel}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
