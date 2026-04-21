import { createPageMetadata } from "@/lib/metadata";
import { artistProfile } from "@/data/artist";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";

export const metadata = createPageMetadata({
  title: "Admin Bio",
  description: "Gestão da biografia da artista.",
  path: "/admin/bio",
  noIndex: true
});

export default function AdminBioPage() {
  return (
    <AdminForm title="Bio da artista" description="Atualize informações institucionais exibidas no site.">
      <FormField label="Nome artístico" htmlFor="name">
        <input id="name" defaultValue={artistProfile.name} />
      </FormField>
      <FormField label="Tagline" htmlFor="tagline">
        <input id="tagline" defaultValue={artistProfile.tagline} />
      </FormField>
      <FormField label="Bio curta" htmlFor="bio-short">
        <textarea id="bio-short" defaultValue={artistProfile.bioShort} />
      </FormField>
      <FormField label="Bio completa" htmlFor="bio-long">
        <textarea id="bio-long" defaultValue={artistProfile.bioLong} />
      </FormField>
      <button type="submit" className="chip">
        Salvar bio
      </button>
    </AdminForm>
  );
}
