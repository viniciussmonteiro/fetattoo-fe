import { createPageMetadata } from "@/lib/metadata";
import { AdminForm } from "@/components/AdminForm/AdminForm";
import { FormField } from "@/components/FormField/FormField";
import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";

export const metadata = createPageMetadata({
  title: "Admin Configurações",
  description: "Configurações gerais do projeto e recursos futuros.",
  path: "/admin/configuracoes",
  noIndex: true
});

export default function AdminSettingsPage() {
  return (
    <div className="flow">
      <AdminForm title="Configurações gerais" description="Base pronta para autenticação, storage e integração de banco de dados.">
        <FormField label="E-mail do admin" htmlFor="admin-email">
          <input id="admin-email" type="email" defaultValue="admin@ananoirtattoo.com" />
        </FormField>
        <FormField label="Modo manutenção" htmlFor="maintenance" hint="Mock de configuração global para futuras flags. ">
          <select id="maintenance" defaultValue="off">
            <option value="off">Desativado</option>
            <option value="on">Ativado</option>
          </select>
        </FormField>
        <FormField label="Provider de storage" htmlFor="storage-provider">
          <select id="storage-provider" defaultValue="mock">
            <option value="mock">Mock local</option>
            <option value="s3">AWS S3 (futuro)</option>
            <option value="cloudinary">Cloudinary (futuro)</option>
          </select>
        </FormField>
        <button type="submit" className="chip">
          Salvar configurações
        </button>
      </AdminForm>

      <ConfirmModal
        title="Reiniciar cache de conteúdo"
        description="Ação mock para limpar cache da camada de dados quando houver integração real com banco e CMS."
      />
    </div>
  );
}
