# MeuPortfólio.com

Plataforma que conecta **contratantes** a **profissionais autônomos**: o contratante encontra
quem faz bem feito e o profissional publica portfólio com atividades, imagens, links, descrição e
duração. A negociação e o contrato acontecem **diretamente entre as partes, fora da plataforma** —
não há pagamento dentro do site.

> Estado atual: **front-end completo, sem backend conectado**. Todas as telas funcionam e validam
> os dados no navegador; onde haveria persistência/envio, aparece um aviso de que falta conectar o
> backend.

---

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **Tailwind CSS 3.4** com design system em variáveis CSS (`src/index.css` + `tailwind.config.ts`)
- **Radix UI / shadcn** como base de componentes (`src/components/ui`)
- **React Router 7** (`createBrowserRouter`, rotas de SPA)
- **framer-motion** para as transições entre telas
- **i18next** já configurado (`src/i18n`, `public/locales`)

## Requisitos

- Node **18+** (testado com Node 22)
- **pnpm** (recomendado) — se preferir, use `npm` trocando os comandos

## Como rodar

```bash
pnpm install        # instala as dependências (node_modules não vem no pacote)
pnpm dev            # desenvolvimento em http://localhost:8080
pnpm build:prod     # build de produção em ./dist
pnpm preview        # serve o build gerado
pnpm check          # lint + verificação de tipos (tsc --noEmit)
```

## Deploy

- **Vercel:** o `vercel.json` já define build (`pnpm build:prod`), saída (`dist`) e o rewrite das
  rotas de SPA.
- **Netlify:** build `pnpm build:prod`, publish `dist`; o `public/_redirects` cuida do fallback.
- **Outros hosts estáticos:** publique `dist/` com fallback de todas as rotas para `index.html`
  (a aplicação usa rotas de cliente).

## Estrutura

```
src/
  pages/                  # uma página por rota
    Index.tsx             # tela de acesso + fluxo de cadastro/recuperação (estado interno)
    SobreNos.tsx  Contato.tsx  Termos.tsx  Privacidade.tsx  Lgpd.tsx
    ContratanteHome.tsx  ContratantePerfil.tsx
    ProfissionalHome.tsx ProfissionalPerfil.tsx
    ProfissionalPortfolios.tsx  ProfissionalPortfolioNovo.tsx
  components/
    auth/                 # telas de acesso: login, cadastro, recuperação, código, nova senha
    area/                 # área logada: layout, perfil, portfólio, avatar, sair
    public/               # páginas públicas: sobre, contato, documentos legais
    contractor/           # busca de profissionais (home do contratante)
    ui/                   # design system e base (button, check-field, segmented-field, select-field…)
  lib/                    # regras puras: validações, máscaras, configurações, conteúdo
  i18n/                   # configuração do i18next
  index.css               # tokens do design system
  router.tsx              # tabela de rotas
tailwind.config.ts        # tema, fontes, animações
```

## Rotas

| Rota | Tela |
| --- | --- |
| `/` | Acesso (login) + fluxo de cadastro/recuperação de senha |
| `/sobre-nos`, `/contato` | Páginas públicas |
| `/termos`, `/privacidade`, `/lgpd` | Documentos legais |
| `/contratante` | Home do contratante (busca de profissionais) |
| `/contratante/perfil` | Perfil do contratante (foto, dados, CPF/CNPJ) |
| `/profissional` | Home do profissional (CRIAR PORTFÓLIO) |
| `/profissional/portfolios` | Meus Portfólios |
| `/profissional/portfolios/novo` | Criar portfólio (atividade, resumo, atividades, imagens) |
| `/profissional/perfil` | Perfil do profissional (foto, dados, CPF) |

O fluxo de acesso (login → escolha de perfil → cadastro → recuperação de senha → código → nova
senha) acontece **na mesma rota `/`**, com transições animadas, controlado por um estado interno em
`src/pages/Index.tsx`.

## Design system

- Cor predominante **marrom** (`brown-50` a `brown-900`) com acento **bronze/dourado** (`gold-*`).
- Títulos em **Fraunces**, texto em **Inter**, valores/documentos em **JetBrains Mono**.
- Gradientes utilitários com prefixo `gradient-`: `bg-gradient-canvas`, `bg-gradient-glow`,
  `bg-gradient-card`… (as cores ficam em `bg-canvas`, `bg-card`, etc. — evite colisão entre as duas
  chaves no `tailwind.config.ts`).
- Animações reutilizáveis: `animate-fade-up`, `animate-pop-in`, `animate-hairline-in`,
  `animate-reveal-menu`, `animate-pulse-glow`.
- Sempre use **tokens semânticos** (`bg-card`, `text-foreground`, `border-input`, `text-gold-700`),
  nunca cores fixas como `bg-white`/`text-black`.

## Componentes próprios do design system

- `ui/check-field.tsx` — checkbox personalizado (preenchimento, halo dourado, check animado).
- `ui/segmented-field.tsx` — escolha em segmentos (ex.: CPF ou CNPJ).
- `ui/select-field.tsx` — seleção personalizada (menu próprio, sem o select nativo): usada nos
  **Estados** (com selo da UF) e nos **ramos de atividade** (com ícone por atividade).
- `auth/birth-date-field.tsx` — data de nascimento em **DD / MM / AAAA** com avanço automático.
- `auth/password-requirements.tsx` — pílulas de requisitos da senha com feedback ao vivo.
- `area/profile-photo-field.tsx` e `area/portfolio-images-field.tsx` — anexo de imagens com
  pré-visualização.

## Regras de senha

- **12 caracteres**, com **1 letra maiúscula**, **1 número** e **1 caractere especial**.
- As regras ficam em `src/lib/account-validation.ts` (`MIN_PASSWORD_LENGTH` e
  `PASSWORD_REQUIREMENTS`) e são exibidas com feedback ao vivo nos cadastros e na tela de nova senha.
- No **login** valida-se apenas que a senha foi informada (a política não é checada na entrada).

## Convenções dos formulários

- Campos obrigatórios levam `*` dourado no rótulo; a validação acusa **ao sair do campo** e no envio,
  com aviso no topo do botão e foco/rolagem automática para o primeiro campo inválido.
- Regras puras ficam em `src/lib`:
  - `account-validation.ts` — dados cadastrais, requisitos de senha e validação por perfil;
  - `account-profile.ts` — configuração declarativa de cada perfil (títulos, rótulos e **quais campos
    aparecem** conforme o tipo de documento escolhido);
  - `br-documents.ts` — máscaras e validação de **CPF/CNPJ** (dígitos verificadores) e telefone;
  - `birth-date.ts` — data de nascimento com idade mínima de 18 anos;
  - `portfolio-activity.ts` / `url.ts` — atividades do portfólio e validação de links.
- Cadastro do contratante: a **escolha CPF/CNPJ é o primeiro campo** e define os demais — CPF pede
  nome, CPF e data de nascimento; CNPJ pede razão social e CNPJ.
- Fotos e imagens são pré-visualizadas localmente (URLs de objeto) e liberadas da memória ao
  trocar/remover.

## Próximos passos

Backend (autenticação real, sessão por perfil, persistência de perfis e portfólios, upload de
imagens) e as telas que ainda dependem dele — hoje a interface avisa isso nos próprios formulários.
