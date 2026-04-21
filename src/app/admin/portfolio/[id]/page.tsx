import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { portfolioItems } from "@/data/portfolio";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";

type PortfolioItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PortfolioItemPageProps) {
  const { id } = await params;

  return createPageMetadata({
    title: `Editar item #${id}`,
    description: "Edição de item de portfólio no painel administrativo.",
    path: `/admin/portfolio/${id}`,
    noIndex: true
  });
}

export default async function AdminPortfolioItemPage({ params }: PortfolioItemPageProps) {
  const { id } = await params;
  const item = portfolioItems.find((entry) => String(entry.id) === id);

  if (!item) {
    notFound();
  }

  return (
    <AdminForm title={`Editar: ${item.title}`} description="Atualize dados da tatuagem e status de destaque.">
      <FormField label="Título" htmlFor="title">
        <input id="title" name="title" defaultValue={item.title} />
      </FormField>
      <FormField label="Categoria" htmlFor="category">
        <input id="category" name="category" defaultValue={item.category} />
      </FormField>
      <FormField label="Região" htmlFor="bodyPart">
        <input id="bodyPart" name="bodyPart" defaultValue={item.bodyPart} />
      </FormField>
      <FormField label="Técnica" htmlFor="technique">
        <input id="technique" name="technique" defaultValue={item.technique} />
      </FormField>
      <FormField label="Descrição para alt" htmlFor="alt">
        <textarea id="alt" name="alt" defaultValue={item.alt} />
      </FormField>
      <ImageUploader label="Substituir imagem" />
      <button type="submit" className="chip">
        Atualizar item
      </button>
    </AdminForm>
  );
}
