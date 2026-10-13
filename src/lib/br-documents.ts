/** Utilitários para identificação por e-mail ou CPF (pt-BR). */

export type IdentifierKind = "email" | "cpf" | null;

/** Aplica a máscara 000.000.000-00 enquanto o usuário digita. */
export const maskCpf = (value: string): string =>
  value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");

/** Detecta se o valor digitado parece um e-mail ou um CPF. */
export const detectIdentifier = (value: string): IdentifierKind => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.includes("@")) return "email";
  return /\d/.test(trimmed) ? "cpf" : null;
};

/** Validação estrutural do CPF (dígitos verificadores). */
export const isValidCpf = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const checkDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      sum += Number(digits[i]) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10]);
};

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Aplica a máscara (00) 00000-0000 enquanto o usuário digita. */
export const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

/** Telefone válido: fixo (10 dígitos) ou celular (11 dígitos), com DDD. */
export const isValidPhone = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
};

/** Aplica a máscara 00.000.000/0000-00 enquanto o usuário digita. */
export const maskCnpj = (value: string): string =>
  value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

/** Validação estrutural do CNPJ (dígitos verificadores). */
export const isValidCnpj = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;

  const checkDigit = (length: number) => {
    let sum = 0;
    let weight = length - 7;
    for (let index = length; index >= 1; index -= 1) {
      sum += Number(digits[length - index]) * weight;
      weight -= 1;
      if (weight < 2) weight = 9;
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  return checkDigit(12) === Number(digits[12]) && checkDigit(13) === Number(digits[13]);
};

/** Escolhe a máscara pelo tamanho do valor: até 11 dígitos = CPF, acima = CNPJ. */
export const maskDocument = (value: string): string =>
  value.replace(/\D/g, "").length > 11 ? maskCnpj(value) : maskCpf(value);

/** Detecta se o documento digitado é CPF ou CNPJ. */
export const detectDocument = (value: string): "cpf" | "cnpj" | null => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return null;
  return digits.length > 11 ? "cnpj" : "cpf";
};

/** Valida o documento de acordo com o tipo escolhido pelo usuário. */
export const validateCpfOrCnpj = (value: string, type: "cpf" | "cnpj"): string | null => {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) {
    return type === "cnpj" ? "Informe o CNPJ." : "Informe o CPF.";
  }

  if (type === "cnpj") {
    return isValidCnpj(value) ? null : "Este CNPJ parece incompleto ou inválido.";
  }

  return isValidCpf(value) ? null : "Este CPF parece incompleto ou inválido.";
};

/** Valida o documento informado, respeitando se o CNPJ é aceito naquele perfil. */
export const validateDocument = (value: string, allowCnpj: boolean): string | null => {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) {
    return allowCnpj ? "Informe seu CPF ou CNPJ." : "Informe seu CPF.";
  }

  if (digits.length <= 11) {
    return isValidCpf(value) ? null : "Este CPF parece incompleto ou inválido.";
  }

  if (!allowCnpj) return "Informe apenas o CPF (11 dígitos).";

  return isValidCnpj(value) ? null : "Este CNPJ parece incompleto ou inválido.";
};

/** Recebe o identificador já formatado e diz se está válido. */
export const validateIdentifier = (value: string): string | null => {
  const kind = detectIdentifier(value);
  if (!kind) return "Informe seu e-mail ou CPF para continuar.";
  if (kind === "cpf" && !isValidCpf(value)) return "Este CPF parece incompleto ou inválido.";
  if (kind === "email" && !isValidEmail(value)) return "Confira o formato do e-mail informado.";
  return null;
};
