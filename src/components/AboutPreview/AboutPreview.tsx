import { AboutSection } from "@/components/AboutSection/AboutSection";

export function AboutPreview() {
  return (
    <section className="section" aria-label="Resumo sobre a artista">
      <div className="container">
        <AboutSection compact />
      </div>
    </section>
  );
}
