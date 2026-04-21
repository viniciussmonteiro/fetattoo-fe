import { createPageMetadata } from "@/lib/metadata";
import { faqItems } from "@/data/faq";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";

export const metadata = createPageMetadata({
  title: "Admin FAQ",
  description: "Gestão de perguntas frequentes.",
  path: "/admin/faq",
  noIndex: true
});

export default function AdminFaqPage() {
  const rows = faqItems.map((item) => [String(item.id), item.question, item.answer]);

  return (
    <div className="flow">
      <AdminTable caption="Perguntas cadastradas" headers={["ID", "Pergunta", "Resposta"]} rows={rows} />
      <AdminForm title="Nova pergunta" description="Adicione novos itens ao FAQ.">
        <FormField label="Pergunta" htmlFor="faq-question">
          <input id="faq-question" type="text" />
        </FormField>
        <FormField label="Resposta" htmlFor="faq-answer">
          <textarea id="faq-answer" />
        </FormField>
        <button type="submit" className="chip">
          Adicionar pergunta
        </button>
      </AdminForm>
    </div>
  );
}
