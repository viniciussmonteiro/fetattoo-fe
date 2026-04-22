import { AboutSection } from "@/components/AboutSection/AboutSection";
import type { ArtistProfile } from "@/data/artist";

type AboutPreviewProps = {
  profile?: ArtistProfile;
};

export function AboutPreview({ profile }: AboutPreviewProps) {
  return (
    <section className="section" aria-label="Resumo sobre a artista">
      <div className="container">
        <AboutSection compact profile={profile} />
      </div>
    </section>
  );
}
