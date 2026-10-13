import * as React from "react";
import {
  AlertCircle,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  MailCheck,
  Plus,
  Trash2,
} from "lucide-react";

import type { AccountType } from "@/components/auth/account-type-picker";
import AuthSelectField from "@/components/ui/select-field";
import BirthDateField from "@/components/auth/birth-date-field";
import FloatingField from "@/components/auth/auth-floating-field";
import PasswordRequirements from "@/components/auth/password-requirements";
import SegmentedField from "@/components/ui/segmented-field";
import { Button } from "@/components/ui/button";
import { ACCOUNT_PROFILES, type SignupFieldMode } from "@/lib/account-profile";
import { validateAccountField, validatePasswordField } from "@/lib/account-validation";
import { BRAZILIAN_STATES } from "@/lib/brazil-states";
import { EMPTY_BIRTH_DATE, validateBirthDate, type BirthDate } from "@/lib/birth-date";
import { maskCnpj, maskCpf, maskPhone } from "@/lib/br-documents";
import { cn } from "@/lib/utils";

const INITIAL_VALUES = {
  name: "",
  companyName: "",
  phone: "",
  phone2: "",
  email: "",
  documentType: "",
  document: "",
  state: "",
  city: "",
  password: "",
  confirm: "",
};

type FieldName = keyof typeof INITIAL_VALUES;
type FormErrors = Partial<Record<FieldName, string>>;

const STATES = BRAZILIAN_STATES.map(({ code, name }) => ({
  value: code,
  label: name,
  meta: code,
}));

const DOCUMENT_TYPE_OPTIONS = [
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
];

interface SignupFormProps {
  profile: AccountType;
  onBack: () => void;
  /** Chamado após o envio válido (ex.: entrar na área do contratante). */
  onSuccess?: () => void;
}

/** Formulário de criação de conta, compartilhado pelos perfis profissional e contratante. */
const SignupForm = ({ profile, onBack, onSuccess }: SignupFormProps) => {
  const config = ACCOUNT_PROFILES[profile];
  const { signup } = config;

  const [values, setValues] = React.useState(INITIAL_VALUES);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [birthDate, setBirthDate] = React.useState<BirthDate>(EMPTY_BIRTH_DATE);
  const [birthError, setBirthError] = React.useState<string | null>(null);
  const [secondPhoneVisible, setSecondPhoneVisible] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "invalid">("idle");

  const documentType = values.documentType as "" | "cpf" | "cnpj";

  /** O campo aparece quando o modo combina com o documento escolhido. */
  const isVisible = (mode: SignupFieldMode) => {
    if (mode === "always") return true;
    if (mode === "never") return false;
    if (mode === "when-chosen") return Boolean(documentType);
    if (!documentType) return false;
    return mode === (documentType === "cpf" ? "when-cpf" : "when-cnpj");
  };

  const showName = isVisible(signup.name);
  const showCompanyName = isVisible(signup.companyName);
  const showDocument = isVisible(signup.document);
  const showBirthDate = isVisible(signup.birthDate);

  /** Tipo do documento efetivamente preenchido no cadastro (CPF ou CNPJ). */
  const documentFieldType: "cpf" | "cnpj" = documentType === "cnpj" ? "cnpj" : "cpf";
  const documentIsCnpj = documentFieldType === "cnpj";

  const validationOptions = {
    allowCnpj: config.allowCnpj,
    secondPhone: secondPhoneVisible,
    documentType: documentFieldType,
    companyNameRequired: signup.companyName !== "never",
  };

  const setField = (field: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
    setStatus((previous) => (previous === "loading" ? previous : "idle"));
  };

  const toggleSecondPhone = () => {
    setSecondPhoneVisible((visible) => {
      if (visible) setField("phone2", "");
      return !visible;
    });
  };

  /** Ao trocar entre CPF e CNPJ, limpa os campos que deixam de valer. */
  const handleDocumentTypeChange = (value: string) => {
    setValues((previous) => ({
      ...previous,
      documentType: value,
      document: "",
      name: value === "cnpj" ? "" : previous.name,
      companyName: value === "cpf" ? "" : previous.companyName,
    }));
    setErrors({});
    setBirthDate(EMPTY_BIRTH_DATE);
    setBirthError(null);
    setStatus((previous) => (previous === "loading" ? previous : "idle"));
  };

  const validateField = (
    field: "name" | "companyName" | "phone" | "phone2" | "email" | "document" | "state" | "city",
  ) => validateAccountField(field, values, validationOptions);

  const validateById = (id: string): string | undefined => {
    switch (id) {
      case "documentType":
        return values.documentType ? undefined : "Escolha entre CPF e CNPJ.";
      case "name":
      case "companyName":
      case "phone":
      case "phone2":
      case "email":
      case "document":
      case "state":
      case "city":
        return validateField(id);
      case "birthDate":
        return validateBirthDate(birthDate);
      case "password":
        return validatePasswordField("password", values.password, values.confirm);
      case "confirm":
        return validatePasswordField("confirm", values.password, values.confirm);
      default:
        return undefined;
    }
  };

  const orderedFieldIds: string[] = [
    ...(signup.documentChoice ? ["documentType"] : []),
    ...(showName ? ["name"] : []),
    ...(showCompanyName ? ["companyName"] : []),
    "phone",
    ...(secondPhoneVisible ? ["phone2"] : []),
    "email",
    ...(showDocument ? ["document"] : []),
    ...(showBirthDate ? ["birthDate"] : []),
    "state",
    "city",
    "password",
    "confirm",
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    let nextBirthError: string | undefined;

    orderedFieldIds.forEach((id) => {
      const message = validateById(id);
      if (!message) return;

      if (id === "birthDate") nextBirthError = message;
      else nextErrors[id as FieldName] = message;
    });

    setErrors(nextErrors);
    setBirthError(nextBirthError ?? null);

    const firstInvalid = orderedFieldIds.find((id) =>
      id === "birthDate" ? Boolean(nextBirthError) : Boolean(nextErrors[id as FieldName]),
    );

    if (firstInvalid) {
      setStatus("invalid");
      const focusId = firstInvalid === "birthDate" ? "birth-day" : firstInvalid;
      const element = document.getElementById(focusId);
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      if (onSuccess) onSuccess();
      else setStatus("done");
    }, 900);
  };

  const loading = status === "loading";

  const passwordToggle = (visible: boolean, onToggle: () => void, label: string) => (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? `Ocultar ${label}` : `Mostrar ${label}`}
      className="focus-gold rounded-md p-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      {visible ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-[760px] xl:max-w-[900px] 2xl:max-w-[1040px]">
      <button
        type="button"
        onClick={onBack}
        className="focus-gold mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-body-s font-medium text-canvas-muted transition-colors duration-200 hover:text-gold-300"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Voltar
      </button>

      <div className="animate-fade-up relative w-full">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
        />

        <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
          <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

          <h2 className="font-display text-headline-l text-foreground">{config.signupHeading}</h2>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            {signup.documentChoice ? (
              <SegmentedField
                id="documentType"
                label="Tipo de documento"
                required
                value={values.documentType}
                onValueChange={handleDocumentTypeChange}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    documentType: validateById("documentType"),
                  }))
                }
                options={DOCUMENT_TYPE_OPTIONS}
                error={errors.documentType}
                hint="Pessoa física ou empresa? A escolha define os próximos campos."
                className="sm:col-span-2"
              />
            ) : null}

            {showName ? (
              <FloatingField
                id="name"
                label="Nome completo"
                required
                value={values.name}
                onValueChange={(value) => setField("name", value)}
                onBlur={() =>
                  setErrors((previous) => ({ ...previous, name: validateField("name") }))
                }
                autoComplete="name"
                error={errors.name}
                className="animate-fade-up sm:col-span-2"
              />
            ) : null}

            {showCompanyName ? (
              <FloatingField
                id="companyName"
                label="Razão social"
                required
                value={values.companyName}
                onValueChange={(value) => setField("companyName", value)}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    companyName: validateField("companyName"),
                  }))
                }
                autoComplete="organization"
                error={errors.companyName}
                className="animate-fade-up sm:col-span-2"
              />
            ) : null}

            <div className="sm:col-span-2">
              <FloatingField
                id="phone"
                label="Telefone"
                required
                value={values.phone}
                onValueChange={(value) => setField("phone", maskPhone(value))}
                onBlur={() =>
                  setErrors((previous) => ({ ...previous, phone: validateField("phone") }))
                }
                inputMode="tel"
                autoComplete="tel"
                error={errors.phone}
                hint="Com DDD. Ex.: (11) 91234-5678"
              />

              <button
                type="button"
                onClick={toggleSecondPhone}
                className="focus-gold mt-3 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-gold-700 underline-offset-4 transition-colors duration-200 hover:underline"
              >
                {secondPhoneVisible ? (
                  <>
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    Remover segundo telefone
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    Adicionar segundo telefone
                  </>
                )}
              </button>

              {secondPhoneVisible ? (
                <FloatingField
                  id="phone2"
                  label="Segundo telefone"
                  value={values.phone2}
                  onValueChange={(value) => setField("phone2", maskPhone(value))}
                  onBlur={() =>
                    setErrors((previous) => ({ ...previous, phone2: validateField("phone2") }))
                  }
                  inputMode="tel"
                  error={errors.phone2}
                  className="mt-5 animate-fade-up"
                />
              ) : null}
            </div>

            <FloatingField
              id="email"
              label="E-mail"
              required
              type="email"
              inputMode="email"
              value={values.email}
              onValueChange={(value) => setField("email", value)}
              onBlur={() => setErrors((previous) => ({ ...previous, email: validateField("email") }))}
              autoComplete="email"
              error={errors.email}
              className="sm:col-span-2"
            />

            {showDocument ? (
              <FloatingField
                id="document"
                label={
                  documentIsCnpj
                    ? "CNPJ"
                    : config.signup.documentChoice
                      ? "CPF"
                      : config.documentLabel
                }
                required
                value={values.document}
                onValueChange={(value) => setField("document", documentIsCnpj ? maskCnpj(value) : maskCpf(value))}
                onBlur={() =>
                  setErrors((previous) => ({ ...previous, document: validateField("document") }))
                }
                inputMode="numeric"
                autoComplete="off"
                mono
                error={errors.document}
                hint={
                  config.signup.documentChoice
                    ? documentIsCnpj
                      ? "Informe o CNPJ da empresa."
                      : "Informe o CPF do responsável."
                    : (config.documentHint ?? undefined)
                }
                className="animate-fade-up sm:col-span-2"
              />
            ) : null}

            {showBirthDate ? (
              <BirthDateField
                value={birthDate}
                onValueChange={(next) => {
                  setBirthDate(next);
                  if (birthError) setBirthError(null);
                  if (status !== "idle" && status !== "loading") setStatus("idle");
                }}
                onBlur={() => setBirthError(validateBirthDate(birthDate) ?? null)}
                error={birthError}
                hint="Usamos a data apenas para confirmar que você tem 18 anos ou mais."
                required
                className="animate-fade-up sm:col-span-2"
              />
            ) : null}

            <AuthSelectField
              id="state"
              label="Estado"
              required
              value={values.state}
              onValueChange={(value) => setField("state", value)}
              onBlur={() => setErrors((previous) => ({ ...previous, state: validateField("state") }))}
              options={STATES}
              error={errors.state}
            />

            <FloatingField
              id="city"
              label="Cidade"
              required
              value={values.city}
              onValueChange={(value) => setField("city", value)}
              onBlur={() => setErrors((previous) => ({ ...previous, city: validateField("city") }))}
              autoComplete="address-level2"
              error={errors.city}
            />

            <FloatingField
              id="password"
              label="Senha"
              required
              type={showPassword ? "text" : "password"}
              value={values.password}
              onValueChange={(value) => setField("password", value)}
              onBlur={() =>
                setErrors((previous) => ({
                  ...previous,
                  password: validatePasswordField("password", values.password, values.confirm),
                }))
              }
              autoComplete="new-password"
              error={errors.password}
              hint={<PasswordRequirements password={values.password} />}
              trailing={passwordToggle(showPassword, () => setShowPassword((v) => !v), "senha")}
            />

            <FloatingField
              id="confirm"
              label="Confirmar senha"
              required
              type={showConfirm ? "text" : "password"}
              value={values.confirm}
              onValueChange={(value) => setField("confirm", value)}
              onBlur={() =>
                setErrors((previous) => ({
                  ...previous,
                  confirm: validatePasswordField("confirm", values.password, values.confirm),
                }))
              }
              autoComplete="new-password"
              error={errors.confirm}
              trailing={passwordToggle(
                showConfirm,
                () => setShowConfirm((v) => !v),
                "confirmação de senha",
              )}
            />

            {status === "invalid" ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-xs font-medium leading-relaxed text-destructive sm:col-span-2"
              >
                <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden />
                Não foi possível finalizar: preencha corretamente os campos obrigatórios destacados.
              </p>
            ) : null}

            <Button
              type="submit"
              variant="premium"
              size="xl"
              disabled={loading}
              className={cn(
                "group relative overflow-hidden sm:col-span-2",
                !loading && "hover:-translate-y-px",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
              />
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              <span className="relative tracking-[0.01em]">
                {loading ? "Finalizando…" : "Finalizar cadastro"}
              </span>
            </Button>

            {status === "done" ? (
              <p
                role="status"
                className="flex items-start gap-2 rounded-xl border border-gold-500/30 bg-brown-100/60 px-3.5 py-3 text-xs leading-relaxed text-brown-700 sm:col-span-2"
              >
                <MailCheck className="mt-px h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                Dados validados. Ainda falta conectar o backend para criar a conta e enviar o e-mail
                de confirmação.
              </p>
            ) : (
              <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground sm:col-span-2">
                <Mail className="mt-px h-3.5 w-3.5 shrink-0 text-gold-700" aria-hidden />
                Após finalizar, iremos lhe encaminhar um e-mail confirmando seu cadastro
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignupForm;
