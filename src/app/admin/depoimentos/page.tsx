import { createPageMetadata } from "@/lib/metadata";
import { testimonials } from "@/data/testimonials";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";

export const metadata = createPageMetadata({
  title: "Admin Depoimentos",
  description: "Gestão de depoimentos exibidos na home e páginas institucionais.",
  path: "/admin/depoimentos",
  noIndex: true
});

export default function AdminTestimonialsPage() {
  const rows = testimonials.map((item) => [item.name, item.comment, item.source]);

  return (
    <div className="flow">
      <AdminTable caption="Depoimentos ativos" headers={["Cliente", "Comentário", "Origem"]} rows={rows} />
      <AdminForm title="Novo depoimento" description="Cadastre uma nova avaliação autorizada.">
        <FormField label="Nome" htmlFor="testimonial-name">
          <input id="testimonial-name" type="text" />
        </FormField>
        <FormField label="Comentário" htmlFor="testimonial-comment">
          <textarea id="testimonial-comment" />
        </FormField>
        <FormField label="Origem" htmlFor="testimonial-source">
          <input id="testimonial-source" type="text" />
        </FormField>
        <button type="submit" className="chip">
          Salvar depoimento
        </button>
      </AdminForm>
    </div>
  );
}
