import Link from "next/link";
import styles from "./autorais.module.css";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projetos autorais",
  description: "Espaço para coleções autorais da Ana Noir Tattoo com conceito e narrativa visual.",
  path: "/autorais"
});

export default function AutoraisPage() {
  return (
    <section className="pageIntro">
      <div className={`container ${styles.card}`}>
        <span className="eyebrow">Página opcional prevista</span>
        <h1 className="sectionTitle">Projetos autorais</h1>
        <p className="sectionLead">
          Esta área está preparada para lançar coleções exclusivas e projetos de longa duração com curadoria temática.
        </p>
        <Link href="/contato" className={styles.link}>
          Entrar na lista de interesse
        </Link>
      </div>
    </section>
  );
}
