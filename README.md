# Convertfy Admin

Sistema administrativo SaaS para gestão de agência de e-commerce.

## 🚀 Funcionalidades

### Dashboard Principal
- Métricas financeiras em tempo real (faturamento, MRR, inadimplência)
- Alertas de reuniões atrasadas, cobranças pendentes, contratos vencendo
- KPIs comerciais (leads, conversão, pipeline)
- Gráficos interativos de evolução

### Gestão de Clientes
- Listagem com filtros avançados e busca
- Ficha completa com abas (Dados, Financeiro, Reuniões, Relatórios, Métricas, Timeline)
- Score de saúde automático (🟢 Saudável, 🟡 Atenção, 🔴 Crítico)
- Sistema de tags e campos customizados
- Múltiplas lojas Shopify por cliente

### Pipeline de Vendas
- Kanban drag-and-drop
- Múltiplos pipelines configuráveis
- Valor por etapa
- Campos customizados nos cards

### Métricas Consolidadas
- Meta Ads (Facebook/Instagram)
- Google Ads
- Shopify
- Klaviyo
- Instagram

### Automações
- Construtor visual de fluxos
- Gatilhos: novo cliente, pagamento, reunião, contrato, pipeline
- Ações: email, WhatsApp, SMS, notificação, webhook
- Logs de execução

### Hub de Ferramentas
- Gerador de assuntos de email (IA)
- Gerador de copy (IA)
- Calculadora ROAS
- Benchmark de clientes

## 🛠️ Stack Tecnológica

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS v4
- **Backend:** Supabase (Auth, Database, Edge Functions, Realtime)
- **Hospedagem:** Vercel
- **Banco de Dados:** PostgreSQL via Supabase

## 📦 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Supabase](https://supabase.com)
- Conta na [Vercel](https://vercel.com) (para deploy)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/convertfy-admin.git
cd convertfy-admin
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

1. Crie um novo projeto em [supabase.com](https://supabase.com)
2. Vá em **Project Settings > API** e copie:
   - `Project URL`
   - `anon/public key`
3. Vá em **SQL Editor** e execute o conteúdo de `supabase/schema.sql`

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy na Vercel

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Execute o deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente no dashboard da Vercel.

## 🔌 Integrações

### Asaas (Pagamentos)
1. Acesse [asaas.com](https://www.asaas.com) e crie uma conta
2. Vá em **Configurações > Integrações > API**
3. Copie a API Key e configure no sistema

### Meta Ads (Facebook/Instagram)
1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Crie um App e configure o Marketing API
3. Gere um Access Token com permissões de leitura

### Google Ads
1. Acesse [Google Ads API](https://developers.google.com/google-ads/api)
2. Siga o guia de configuração OAuth
3. Obtenha o Developer Token

### Klaviyo
1. Acesse [Klaviyo](https://www.klaviyo.com)
2. Vá em **Account > Settings > API Keys**
3. Crie uma Private API Key

## 📁 Estrutura de Pastas

```
convertfy-admin/
├── public/              # Arquivos estáticos
├── src/
│   ├── app/             # Páginas (App Router)
│   │   ├── page.tsx     # Dashboard
│   │   ├── clients/     # Gestão de clientes
│   │   ├── pipeline/    # Pipeline Kanban
│   │   ├── automations/ # Automações
│   │   ├── metrics/     # Métricas
│   │   ├── hub/         # Ferramentas
│   │   └── settings/    # Configurações
│   ├── components/
│   │   ├── ui/          # Componentes base
│   │   ├── layout/      # Layout (Sidebar, Header)
│   │   └── dashboard/   # Componentes do dashboard
│   ├── lib/
│   │   ├── utils.ts     # Utilitários
│   │   └── supabase/    # Clients Supabase
│   ├── hooks/           # Custom hooks
│   ├── stores/          # Zustand stores
│   └── types/           # TypeScript types
└── supabase/
    └── schema.sql       # Schema do banco de dados
```

## 🎨 Design System

### Cores principais
- **Background:** `#0A0A0B` (dark)
- **Surface:** `#1C1C1F`
- **Brand Purple:** `#8B5CF6`
- **Brand Cyan:** `#06B6D4`
- **Success:** `#22C55E`
- **Warning:** `#F59E0B`
- **Error:** `#EF4444`

## 🔐 Perfis de Usuário

| Perfil | Permissões |
|--------|-----------|
| Admin | Acesso total |
| Gestor | Clientes, Pipeline, Métricas, Relatórios |
| SDR | Leads, Pipeline (criar) |
| Closer | Pipeline, Clientes (ver), Reuniões |
| CS | Clientes, Reuniões, Relatórios, Métricas |
| Financeiro | Faturas, Pagamentos, Clientes (ver) |

## 📝 Próximos Passos

- [ ] Implementar autenticação com Supabase Auth
- [ ] Conectar APIs reais (Asaas, Meta, etc.)
- [ ] Implementar Edge Functions para automações
- [ ] Adicionar Realtime para notificações
- [ ] Implementar geração de relatórios PDF
- [ ] Adicionar testes automatizados

## 📄 Licença

Este projeto é proprietário da Convertfy.
