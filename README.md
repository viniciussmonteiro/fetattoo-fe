# Fernanda Borges - Front-end

Front-end do site de portfólio da tatuadora **Fernanda Borges**, construído com:

- Next.js (App Router)
- TypeScript
- CSS puro / CSS Modules
- `next/image`

## Escopo atual

### Público
- Home, Portfólio, Sobre, FAQ, Cuidados, Contato
- SEO básico por página (metadata)
- Acessibilidade básica (estrutura semântica, labels, alt, navegação clara)
- Performance com imagem hero prioritária e lazy loading fora da dobra

### Admin
- Login real integrado ao back-end (`/login`)
- Sessão via cookie `HttpOnly`
- Guard de rota no layout de `/admin`
- Logout funcional
- CRUD integrado ao back-end para:
  - Dashboard
  - Bio
  - Redes sociais
  - FAQ
  - Depoimentos
  - Portfólio
  - Configurações gerais
  - Mensagens de contato (status)
  - Fotos do portfólio (adicionar, remover e definir capa)

## Integração com back-end

O front usa `BACKEND_API_URL` para comunicação com o `fetattoo-be`.

- Rotas públicas são consumidas por repositórios server-side.
- Rotas administrativas usam proxy interno em `/api/admin/[...path]`, que injeta o token da sessão.
- Auth no front:
  - `POST /api/auth/login`
  - `GET /api/auth/me`
  - `POST /api/auth/logout`

## Variáveis de ambiente

Crie `.env.local` a partir de `.env.example`:

```bash
cp .env.example .env.local
```

`fetattoo-fe/.env.example`:

- `NEXT_PUBLIC_SITE_URL` URL canônica do front (SEO)
- `BACKEND_API_URL` URL do back-end (ex.: `http://localhost:4000`)

## Rodando localmente

### 1) Instalar dependências

```bash
npm install
```

### 2) Rodar em desenvolvimento

```bash
npm run dev
```

Front: [http://localhost:3000](http://localhost:3000)

### 3) Build de produção

```bash
npm run build
npm run start
```

### 4) Lint

```bash
npm run lint
```

## Fluxo de login admin

1. Acesse `/login`
2. Faça login com usuário admin seedado no back-end
3. O token JWT fica em cookie `HttpOnly`
4. Rotas `/admin/*` exigem sessão válida

## Upload de fotos no admin

- Em `Admin > Portfólio > Editar item`, seção **Fotos do portfólio**:
  - você pode enviar arquivo (`JPG`, `PNG`, `WEBP`, `AVIF`, até `5MB`)
  - ou informar uma URL pública de imagem
  - definir capa e remover imagens já cadastradas
- Upload local é salvo em `public/uploads/tattoos`.
- Essas imagens são ignoradas pelo Git (`public/uploads` no `.gitignore`).

## Fallback de dados

- Quando `BACKEND_API_URL` **não** está configurada:
  - páginas públicas usam fallback local (dados mockados do `src/data`)
  - rotas/proxy admin retornam erro informando ausência da configuração

## Estrutura principal

```txt
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── login/
│   └── ...
├── components/
├── data/
├── hooks/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── repositories/
│   └── server/
├── styles/
└── types/
```
