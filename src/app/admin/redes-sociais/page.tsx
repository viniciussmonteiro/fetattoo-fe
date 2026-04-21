import { createPageMetadata } from "@/lib/metadata";
import { socialLinks } from "@/data/socialLinks";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";

export const metadata = createPageMetadata({
  title: "Admin Redes Sociais",
  description: "Gestão de links sociais e canais de contato.",
  path: "/admin/redes-sociais",
  noIndex: true
});

export default function AdminSocialLinksPage() {
  const rows = socialLinks.map((link) => [link.shortLabel, link.label, link.href]);

  return (
    <div className="flow">
      <AdminTable caption="Links atuais" headers={["Rótulo curto", "Descrição", "URL"]} rows={rows} />
      <AdminForm title="Editar links" description="Atualize os links oficiais que aparecem no site.">
        {socialLinks.map((link) => (
          <FormField key={link.id} label={link.shortLabel} htmlFor={link.id}>
            <input id={link.id} defaultValue={link.href} />
          </FormField>
        ))}
        <button type="submit" className="chip">
          Salvar links
        </button>
      </AdminForm>
    </div>
  );
}
