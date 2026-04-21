# Ana Noir Tattoo - Portfólio Profissional (Next.js)

Site de portfólio profissional para tatuadora, construído com **Node.js + Next.js (App Router) + CSS puro/CSS Modules**, com foco em:

- visual forte, premium e mobile-first
- performance e carregamento rápido
- SEO básico por página
- acessibilidade semântica e navegação clara
- estrutura escalável para integração futura com CMS

## Stack

- Next.js (App Router)
- React
- TypeScript
- CSS puro + CSS Modules
- `next/image` para otimização de imagens

## Requisitos atendidos

- App Router em `src/app`
- Estrutura componentizada e escalável
- Sem Tailwind
- Sem bibliotecas visuais pesadas
- Metadata por página
- HTML semântico e labels de formulário
- Alt descritivo nas imagens
- Hero com imagem `priority`
- Galerias e imagens secundárias com lazy loading padrão
- Layout mobile-first com boa responsividade

## Estrutura de pastas

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
│   └── globals.tsx
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── Hero/
│   ├── PortfolioGrid/
│   ├── PortfolioCard/
│   ├── PortfolioFilters/
│   ├── AboutSection/
│   ├── ContactForm/
│   ├── FAQAccordion/
│   └── Button/
├── data/
│   ├── portfolio.tsx
│   ├── faq.tsx
│   └── testimonials.tsx
├── styles/
│   ├── variables.css
│   └── utilities.css
└── lib/
    └── metadata.tsx
```

## Rotas implementadas

Obrigatórias:

- `/` Home
- `/portfolio`
- `/sobre`
- `/contato`
- `/faq`
- `/cuidados`

Opcionalmente já previstas:

- `/flash`
- `/autorais`
- `/blog`

## Como rodar localmente

### 1) Instalar dependências

```bash
npm install
```

### 2) Iniciar ambiente de desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 3) Build de produção

```bash
npm run build
npm run start
```

## Conteúdo mockado

Dados locais prontos para futura migração para CMS:

- `src/data/portfolio.tsx`
- `src/data/faq.tsx`
- `src/data/testimonials.tsx`

## Próximos passos sugeridos

- Integrar formulário com e-mail transacional ou API do WhatsApp
- Conectar dados de galeria a um CMS headless
- Adicionar painel administrativo para atualizar portfólio/FAQ/depoimentos
