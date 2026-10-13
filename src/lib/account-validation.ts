import { isValidEmail, isValidPhone, validateCpfOrCnpj, validateDocument } from "@/lib/br-documents";

export const MIN_PASSWORD_LENGTH = 12;

/** Requisitos da senha, exibidos nos formulários e usados na validação. */
export const PASSWORD_REQUIREMENTS = [
  {
    id: "length",
    label: `${MIN_PASSWORD_LENGTH} caracteres`,
    test: (value: string) => value.length >= MIN_PASSWORD_LENGTH,
  },
  {
    id: "uppercase",
    label: "1 letra maiúscula",
    test: (value: string) => /[A-ZÀ-Þ]/.test(value),
  },
  {
    id: "number",
    label: "1 número",
    test: (value: string) => /\d/.test(value),
  },
  {
    id: "special",
    label: "1 caractere especial",
    test: (value: string) => /[^A-Za-z0-9À-ÿ]/.test(value),
  },
] as const;

/** Campos de dados cadastrais validados (fora senha/confirmar senha). */
export const ACCOUNT_FIELDS = [
  "name",
  "companyName",
  "phone",
  "phone2",
  "email",
  "document",
  "state",
  "city",
] as const;

export type AccountField = (typeof ACCOUNT_FIELDS)[number];

export interface AccountData {
  name: string;
  companyName: string;
  phone: string;
  phone2: string;
  email: string;
  document: string;
  state: string;
  city: string;
}

export interface AccountValidationOptions {
  /** Aceita CNPJ além do CPF (perfil contratante). */
  allowCnpj: boolean;
  /** Segundo telefone visível e validado quando preenchido. */
  secondPhone?: boolean;
  /** Tipo de documento escolhido pelo usuário — valida estritamente esse tipo. */
  documentType?: "cpf" | "cnpj";
  /** Razão social obrigatória (contratante pessoa jurídica). */
  companyNameRequired?: boolean;
}

export const validateAccountField = (
  field: AccountField,
  data: AccountData,
  options: AccountValidationOptions,
): string | undefined => {
  switch (field) {
    case "name":
      return data.name.trim().length < 3 ? "Informe seu nome completo." : undefined;
    case "companyName":
      if (!options.companyNameRequired) return undefined;
      return data.companyName.trim().length < 3 ? "Informe a razão social." : undefined;
    case "phone":
      return isValidPhone(data.phone) ? undefined : "Informe um telefone com DDD.";
    case "phone2":
      if (!options.secondPhone || !data.phone2) return undefined;
      return isValidPhone(data.phone2) ? undefined : "Confira o telefone adicional.";
    case "email":
      return isValidEmail(data.email) ? undefined : "Confira o formato do e-mail informado.";
    case "document":
      return options.documentType
        ? (validateCpfOrCnpj(data.document, options.documentType) ?? undefined)
        : (validateDocument(data.document, options.allowCnpj) ?? undefined);
    case "state":
      return data.state ? undefined : "Selecione o estado.";
    case "city":
      return data.city.trim().length < 2 ? "Informe sua cidade." : undefined;
    default:
      return undefined;
  }
};

export const validateAccountData = (
  data: AccountData,
  options: AccountValidationOptions,
): Partial<Record<AccountField, string>> => {
  const errors: Partial<Record<AccountField, string>> = {};

  ACCOUNT_FIELDS.forEach((field) => {
    const message = validateAccountField(field, data, options);
    if (message) errors[field] = message;
  });

  return errors;
};

export const validatePasswordField = (
  field: "password" | "confirm",
  password: string,
  confirm: string,
): string | undefined => {
  if (field === "password") {
    const unmet = PASSWORD_REQUIREMENTS.find((requirement) => !requirement.test(password));

    if (!unmet) return undefined;
    return unmet.id === "length"
      ? `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
      : `A senha precisa conter ${unmet.label}.`;
  }

  return confirm === password ? undefined : "As senhas não coincidem.";
};
