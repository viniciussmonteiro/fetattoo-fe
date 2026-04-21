import Link from "next/link";
import styles from "./AdminSidebar.module.css";
import { artistProfile } from "@/data/artist";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/portfolio", label: "Portfólio" },
  { href: "/admin/bio", label: "Bio" },
  { href: "/admin/redes-sociais", label: "Redes sociais" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/depoimentos", label: "Depoimentos" },
  { href: "/admin/configuracoes", label: "Configurações" }
] as const;

export function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <p className={styles.title}>Admin</p>
        <span>{artistProfile.name}</span>
      </div>

      <nav aria-label="Menu administrativo">
        <ul className={styles.navList}>
          {adminLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
