import { createPageMetadata } from "@/lib/metadata";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";
import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";

export const metadata = createPageMetadata({
  title: "Novo item de portfólio",
  description: "Cadastro de novo trabalho de tatuagem no painel.",
  path: "/admin/portfolio/novo",
  noIndex: true
});

export default function AdminPortfolioNewPage() {
  return (
    <div className="flow">
      <AdminForm title="Novo item de portfólio" description="Formulário mock preparado para integração futura com API de CRUD.">
        <FormField label="Título" htmlFor="title">
          <input id="title" name="title" type="text" />
        </FormField>
        <FormField label="Categoria" htmlFor="category">
          <select id="category" name="category">
            <option>Fine line</option>
            <option>Blackwork</option>
            <option>Floral</option>
            <option>Anime</option>
          </select>
        </FormField>
        <FormField label="Região do corpo" htmlFor="bodyPart">
          <input id="bodyPart" name="bodyPart" type="text" />
        </FormField>
        <FormField label="Técnica" htmlFor="technique">
          <input id="technique" name="technique" type="text" />
        </FormField>
        <ImageUploader />
        <button type="submit" className="chip">
          Salvar item
        </button>
      </AdminForm>

      <ConfirmModal
        title="Confirmação de publicação"
        description="Este modal mock demonstra a estrutura para confirmar ações críticas antes de salvar ou remover itens."
      />
    </div>
  );
}
