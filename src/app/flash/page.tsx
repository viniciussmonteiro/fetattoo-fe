import Link from "next/link";
import styles from "./flash.module.css";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Flash disponíveis",
  description: "Seleção de flashes disponíveis para agendamento rápido em datas específicas.",
  path: "/flash"
});

export default function FlashPage() {
  return (
    <section className="pageIntro">
      <div className={`container ${styles.card}`}>
        <span className="eyebrow">Página opcional prevista</span>
        <h1 className="sectionTitle">Flash disponíveis</h1>
        <p className="sectionLead">
          Estrutura pronta para receber flashes por coleção, disponibilidade e reserva rápida. Enquanto isso, confira o portfólio
          completo.
        </p>
        <Link href="/portfolio" className={styles.link}>
          Ver portfólio
        </Link>
      </div>
    </section>
  );
}
