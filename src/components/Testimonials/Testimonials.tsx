import Image from "next/image";
import styles from "./Testimonials.module.css";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div>
        <span className="eyebrow">Depoimentos</span>
        <h2 id="testimonials-title" className={styles.title}>
          Experiências reais de clientes
        </h2>
      </div>

      <div className={styles.grid}>
        {testimonials.map((item) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.header}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`Avatar ilustrativo da cliente ${item.name}`}
                  width={52}
                  height={52}
                  loading="lazy"
                />
              ) : null}
              <div>
                <h3>{item.name}</h3>
                <p>{item.source}</p>
              </div>
            </div>
            <p className={styles.comment}>&ldquo;{item.comment}&rdquo;</p>
          </article>
        ))}
      </div>
    </section>
  );
}
