/** Ações disparadas por itens de menu (em vez de navegação). */
export type NavAction = "sign-out";

export interface NavItem {
  label: string;
  description: string;
  /** Rota interna ou âncora. Ausente quando o item executa uma ação. */
  href?: string;
  action?: NavAction;
}

/** Item de saída da conta, presente em todas as áreas logadas. */
const SIGN_OUT_ITEM: NavItem = {
  label: "Sair",
  description: "Encerrar a sessão e voltar para o login",
  action: "sign-out",
};

/** Menu da área pública (visitantes e telas de acesso). */
export const PUBLIC_NAV_ITEMS: NavItem[] = [
  {
    label: "Sobre nós",
    description: "Como conectamos contratantes e profissionais",
    href: "/sobre-nos",
  },
  {
    label: "Contato",
    description: "Fale com o time MeuPortfólio",
    href: "/contato",
  },
];

/** Menu da área do contratante. */
export const CONTRACTOR_NAV_ITEMS: NavItem[] = [
  {
    label: "Perfil",
    description: "Seus dados e preferências",
    href: "/contratante/perfil",
  },
  SIGN_OUT_ITEM,
];

/** Menu da área do profissional. */
export const PROFESSIONAL_NAV_ITEMS: NavItem[] = [
  {
    label: "Meus Portfólios",
    description: "Os trabalhos que você publica para os contratantes",
    href: "/profissional/portfolios",
  },
  {
    label: "Perfil",
    description: "Seus dados, portfólio e verificações",
    href: "/profissional/perfil",
  },
  SIGN_OUT_ITEM,
];

/** Item exibido quando o usuário está em uma subpágina (área logada ou página pública). */
export const homeNavItem = (
  href: string,
  description = "Voltar para a tela inicial",
): NavItem => ({
  label: "Início",
  description,
  href,
});
