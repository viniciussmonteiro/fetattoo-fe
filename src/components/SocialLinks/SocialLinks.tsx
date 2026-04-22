import styles from "./SocialLinks.module.css";
import { socialLinks as fallbackSocialLinks, type SocialLink } from "@/data/socialLinks";

type SocialLinksProps = {
  direction?: "row" | "column";
  links?: SocialLink[];
};

export function SocialLinks({ direction = "row", links = fallbackSocialLinks }: SocialLinksProps) {
  return (
    <ul className={`${styles.list} ${direction === "column" ? styles.column : ""}`.trim()} aria-label="Redes sociais">
      {links.map((link) => {
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
