# 🌿 Site Profissional - Dra. Luazoni Nutricionista

Site profissional completo para nutricionista, com blog e painel administrativo.

## Stack Tecnológica

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend:** Next.js API Routes (Node.js)
- **Banco de dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **Deploy:** Vercel (recomendado)

## Funcionalidades

### Site Público
- ✅ Header fixo com navegação
- ✅ Hero Section com imagem e CTAs
- ✅ Seção Sobre a Nutricionista
- ✅ Cards de Serviços
- ✅ Diferenciais
- ✅ Depoimentos de pacientes
- ✅ Blog com listagem e artigos individuais
- ✅ CTA de agendamento
- ✅ Formulário de contato
- ✅ Footer completo
- ✅ Design 100% responsivo
- ✅ SEO configurado

### Painel Administrativo (`/nutri-admin`)
- ✅ Login seguro exclusivo para a nutricionista
- ✅ Dashboard com listagem de artigos
- ✅ Criar novos artigos com preview
- ✅ Editar artigos existentes
- ✅ Excluir artigos
- ✅ Publicar/despublicar artigos
- ✅ Categorias de artigos
- ✅ Upload de imagem via URL

## Configuração

### 1. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em **SQL Editor** e execute o arquivo `supabase-schema.sql`
4. Vá em **Authentication > Users** e crie um usuário com o e-mail e senha da nutricionista
5. Copie as chaves de API em **Settings > API**

### 2. Configurar as variáveis de ambiente

Copie o arquivo `.env.local.example` para `.env.local` e preencha:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

### 3. Instalar dependências e rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 4. Acessar o painel admin

Acesse `/nutri-admin` e faça login com as credenciais criadas no Supabase.

## Deploy na Vercel

1. Suba o código para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente na Vercel
4. Deploy automático!

## Personalização

### Dados da nutricionista
Edite os seguintes arquivos para personalizar:
- `src/app/layout.tsx` — Nome e metadados SEO
- `src/components/Header.tsx` — Nome e logo
- `src/components/Footer.tsx` — Telefone, endereço, redes sociais
- `src/components/AboutSection.tsx` — Foto, história e credenciais
- `src/components/HeroSection.tsx` — Imagem de fundo e textos
- `src/components/ContactSection.tsx` — Dados de contato

### Cores
As cores são definidas em `src/app/globals.css` usando Tailwind v4.
A cor principal é verde (`green-700: #186940`).
