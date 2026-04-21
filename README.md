# Ana Noir Tattoo - Portfólio Profissional

Projeto em **Node.js + Next.js (App Router) + TypeScript + CSS puro/CSS Modules** para um site de portfólio de tatuadora com foco em:

- identidade visual forte e premium
- galeria profissional com filtros
- conversão para agendamento
- base escalável para CMS, banco, storage e painel admin

## Stack

- Next.js (App Router)
- React
- TypeScript
- CSS global + CSS Modules
- `next/image` para otimização de imagens

## Funcionalidades implementadas

### Site público
- Home completa com:
  - Hero com prioridade de carregamento da imagem principal
  - estilos em destaque
  - prévia do portfólio
  - sobre da artista
  - serviços e estilos atendidos
  - processo de atendimento
  - depoimentos
  - FAQ resumido
  - CTA e contato rápido
- Portfólio com:
  - filtros por categoria
  - filtros de cicatrizadas / antes-depois / destaque
  - grid responsivo com cards ricos em informações
- Páginas institucionais:
  - `/sobre`
  - `/faq` (accordion acessível com `details/summary`)
  - `/cuidados`
  - `/contato` com formulário + WhatsApp + redes + mapa

### Área administrativa (base mock)
- Rotas em `/admin` com layout separado (sidebar + topbar)
- Dashboard inicial
- Gestão mock de:
  - portfólio
  - bio
  - redes sociais
  - FAQ
  - depoimentos
  - configurações

### Base para integrações futuras
- Repositórios e serviços em `src/lib/server` e `src/lib/repositories`
- Hooks iniciais em `src/hooks`
- Rotas API mock em `src/app/api` para:
  - contato
  - portfólio
  - bio
  - faq
  - depoimentos
  - redes sociais

## Estrutura principal

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── portfolio/page.tsx
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── faq/page.tsx
│   ├── cuidados/page.tsx
│   ├── admin/
│   └── api/
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── Button/
│   ├── SectionTitle/
│   ├── Container/
│   ├── Hero/
│   ├── Portfolio*/
│   ├── FeaturedStyles/
│   ├── HomePortfolioPreview/
│   ├── AboutPreview/
│   ├── FAQPreview/
│   └── Admin*/
├── data/
│   ├── portfolio.ts
│   ├── faq.ts
│   ├── testimonials.ts
│   ├── artist.ts
│   ├── services.ts
│   ├── socialLinks.ts
│   ├── process.ts
│   └── care.ts
├── hooks/
├── lib/
│   ├── metadata.ts
│   ├── server/
│   └── repositories/
└── styles/
    ├── reset.css
    ├── variables.css
    ├── typography.css
    └── utilities.css
```

## Rodando localmente

### 1. Instalar dependências

```bash
npm install
```

Se ocorrer erro de permissão de cache no Windows (`EPERM`), use:

```bash
npm config set cache .npm-cache --location=project
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 3. Configurar variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Variáveis importantes:

- `NEXT_PUBLIC_SITE_URL`: URL canônica usada em metadata/SEO
- `BACKEND_API_URL`: URL do back-end para proxy de integração da rota `/api/contact`

### 4. Build de produção

```bash
npm run build
npm run start
```

### 5. Lint

```bash
npm run lint
```

## SEO, acessibilidade e performance

- Metadata por página
- Estrutura semântica com headings claros
- Alt descritivo nas imagens
- Labels em formulários
- Contraste e foco visível
- Mobile-first
- Lazy loading em imagens fora da primeira dobra
- `priority` na imagem principal da Home

## Observações

- O projeto está pronto para desenvolvimento local.
- O painel admin e as APIs internas continuam em modo mock, com arquitetura preparada para CRUD real.
- A rota de contato do front está preparada para integrar com o back-end (`BACKEND_API_URL`) sem expor o endpoint público diretamente ao navegador.
