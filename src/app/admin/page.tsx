import Link from "next/link";
import styles from "./admin.module.css";
import { portfolioItems } from "@/data/portfolio";
import { faqItems } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { socialLinks } from "@/data/socialLinks";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Admin Dashboard",
  description: "Visão geral da gestão de conteúdo do portfólio.",
  path: "/admin",
  noIndex: true
});

export default function AdminDashboardPage() {
  return (
    <div className={styles.layout}>
      <section className={styles.grid} aria-label="Indicadores do painel">
        <DashboardCard label="Tatuagens cadastradas" value={String(portfolioItems.length)} hint="Entre publicadas e rascunhos" />
        <DashboardCard label="Perguntas no FAQ" value={String(faqItems.length)} hint="Conteúdo de atendimento" />
        <DashboardCard label="Depoimentos" value={String(testimonials.length)} hint="Prova social ativa" />
        <DashboardCard label="Redes sociais" value={String(socialLinks.length)} hint="Canais oficiais cadastrados" />
      </section>

      <section className={styles.card}>
        <h2>Ações rápidas</h2>
        <div className={styles.actions}>
          <Link href="/admin/portfolio/novo" className={styles.actionLink}>
            Novo item de portfólio
          </Link>
          <Link href="/admin/faq" className={styles.actionLink}>
            Editar FAQ
          </Link>
          <Link href="/admin/bio" className={styles.actionLink}>
            Atualizar bio
          </Link>
          <Link href="/admin/redes-sociais" className={styles.actionLink}>
            Gerenciar redes sociais
          </Link>
        </div>
      </section>
    </div>
  );
}
