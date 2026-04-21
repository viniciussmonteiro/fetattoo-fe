import Link from "next/link";
import styles from "./blog.module.css";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog e novidades",
  description: "Página preparada para conteúdos sobre processos criativos, cuidados e atualizações de agenda.",
  path: "/blog"
});

export default function BlogPage() {
  return (
    <section className="pageIntro">
      <div className={`container ${styles.card}`}>
        <span className="eyebrow">Página opcional prevista</span>
        <h1 className="sectionTitle">Blog / novidades</h1>
        <p className="sectionLead">
          Estrutura pronta para publicações sobre bastidores, inspirações e orientações de cuidado com tatuagem.
        </p>
        <Link href="/faq" className={styles.link}>
          Ler FAQ enquanto isso
        </Link>
      </div>
    </section>
  );
}
