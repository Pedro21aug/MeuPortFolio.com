export type AccountType = "contratante" | "profissional";

/** Quando um campo do cadastro aparece, de acordo com o documento escolhido. */
export type SignupFieldMode = "always" | "when-chosen" | "when-cpf" | "when-cnpj" | "never";

export interface SignupFieldsConfig {
  /** Mostra a escolha entre CPF e CNPJ como primeiro campo do formulário. */
  documentChoice: boolean;
  name: SignupFieldMode;
  companyName: SignupFieldMode;
  document: SignupFieldMode;
  birthDate: SignupFieldMode;
}

export interface AccountProfileConfig {
  /** Título do formulário de cadastro. */
  signupHeading: string;
  /** Rótulo do documento aceito no cadastro. */
  documentLabel: string;
  /** Aceita CNPJ além do CPF (usado na validação). */
  allowCnpj: boolean;
  /** Exibe o campo de razão social na tela de perfil. */
  companyName: boolean;
  /** Subtítulo da tela de perfil. */
  profileSubtitle: string;
  /** Texto de apoio do campo de documento. */
  documentHint: string | null;
  /** Rota inicial da área do perfil. */
  homePath: string;
  /** Campos do cadastro, por tipo de documento. */
  signup: SignupFieldsConfig;
}

export const ACCOUNT_PROFILES: Record<AccountType, AccountProfileConfig> = {
  profissional: {
    signupHeading: "Cadastro de profissional",
    documentLabel: "CPF",
    allowCnpj: false,
    companyName: false,
    profileSubtitle: "Dados da sua conta de profissional.",
    documentHint: null,
    homePath: "/profissional",
    signup: {
      documentChoice: false,
      name: "always",
      companyName: "never",
      document: "always",
      birthDate: "always",
    },
  },
  contratante: {
    signupHeading: "Cadastro de contratante",
    documentLabel: "CPF ou CNPJ",
    allowCnpj: true,
    companyName: true,
    profileSubtitle: "Dados da sua conta de contratante.",
    documentHint: "Informe o CPF do responsável ou o CNPJ da empresa.",
    homePath: "/contratante",
    signup: {
      documentChoice: true,
      name: "when-cpf",
      companyName: "when-cnpj",
      document: "when-chosen",
      birthDate: "when-cpf",
    },
  },
};
