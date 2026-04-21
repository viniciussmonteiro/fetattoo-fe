import { SectionTitle } from "@/components/SectionTitle/SectionTitle";

type PortfolioHeroProps = {
  total: number;
};

export function PortfolioHero({ total }: PortfolioHeroProps) {
  return (
    <section className="pageIntro" aria-labelledby="portfolio-hero-title">
      <div className="container flow">
        <SectionTitle
          id="portfolio-hero-title"
          eyebrow="Portfólio completo"
          title="Galeria autoral com foco em técnica e composição"
          description="Navegue por categorias como fine line, blackwork, floral, anime e projetos maiores. Cada card mostra estilo, região do corpo e técnica aplicada."
        />
        <p className="sectionLead">Mostrando {total} trabalhos</p>
      </div>
    </section>
  );
}
