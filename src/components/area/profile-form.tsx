import * as React from "react";
import { AlertCircle, BadgeCheck, Building2, IdCard, Loader2, Plus, Trash2 } from "lucide-react";

import AuthSelectField from "@/components/ui/select-field";
import FloatingField from "@/components/auth/auth-floating-field";
import FieldChip from "@/components/auth/field-chip";
import ProfilePhotoField from "@/components/area/profile-photo-field";
import { Button } from "@/components/ui/button";
import {
  ACCOUNT_FIELDS,
  type AccountField,
  validateAccountData,
  validateAccountField,
} from "@/lib/account-validation";
import { ACCOUNT_PROFILES, type AccountType } from "@/lib/account-profile";
import { useAccountPhoto } from "@/lib/account-photo";
import { BRAZILIAN_STATES } from "@/lib/brazil-states";
import { detectDocument, maskDocument, maskPhone } from "@/lib/br-documents";
import { cn } from "@/lib/utils";

const INITIAL_VALUES = {
  name: "",
  companyName: "",
  phone: "",
  phone2: "",
  email: "",
  document: "",
  state: "",
  city: "",
};

const STATES = BRAZILIAN_STATES.map(({ code, name }) => ({
  value: code,
  label: name,
  meta: code,
}));

interface ProfileFormProps {
  profile: AccountType;
}

/** Dados da conta, compartilhado pelos perfis contratante e profissional. */
const ProfileForm = ({ profile }: ProfileFormProps) => {
  const config = ACCOUNT_PROFILES[profile];

  const [values, setValues] = React.useState(INITIAL_VALUES);
  const [errors, setErrors] = React.useState<Partial<Record<AccountField, string>>>({});
  const { photoUrl, setPhotoUrl } = useAccountPhoto();
  const [secondPhoneVisible, setSecondPhoneVisible] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "saved" | "invalid">("idle");

  const documentKind = detectDocument(values.document);
  const options = {
    allowCnpj: config.allowCnpj,
    secondPhone: secondPhoneVisible,
    companyNameRequired: config.companyName,
  };

  const setField = (field: AccountField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
    setStatus((previous) => (previous === "loading" ? previous : "idle"));
  };

  const handleBlur = (field: AccountField) => {
    setErrors((previous) => ({
      ...previous,
      [field]: validateAccountField(field, values, options),
    }));
  };

  const toggleSecondPhone = () => {
    setSecondPhoneVisible((visible) => {
      if (visible) setField("phone2", "");
      return !visible;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateAccountData(values, options);
    setErrors(nextErrors);

    const firstInvalid = ACCOUNT_FIELDS.find((field) => nextErrors[field]);

    if (firstInvalid) {
      setStatus("invalid");
      const element = document.getElementById(firstInvalid);
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => setStatus("saved"), 900);
  };

  const loading = status === "loading";

  return (
    <div className="relative mx-auto w-full max-w-[760px] animate-fade-up xl:max-w-[900px] 2xl:max-w-[1040px]">
      <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

        <h2 className="font-display text-headline-l text-foreground">Perfil</h2>
        <p className="mt-3 text-body-s text-muted-foreground">{config.profileSubtitle}</p>

        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
          <div className="border-b border-border pb-6 sm:col-span-2">
            <ProfilePhotoField photoUrl={photoUrl} onPhotoChange={setPhotoUrl} />
          </div>

          <FloatingField
            id="name"
            label="Nome completo"
            required
            value={values.name}
            onValueChange={(value) => setField("name", value)}
            onBlur={() => handleBlur("name")}
            autoComplete="name"
            error={errors.name}
            className="sm:col-span-2"
          />

          {config.companyName ? (
            <FloatingField
              id="companyName"
              label="Razão social"
              required
              value={values.companyName}
              onValueChange={(value) => setField("companyName", value)}
              onBlur={() => handleBlur("companyName")}
              autoComplete="organization"
              error={errors.companyName}
              className="sm:col-span-2"
            />
          ) : null}

          <div className="sm:col-span-2">
            <FloatingField
              id="phone"
              label="Telefone"
              required
              value={values.phone}
              onValueChange={(value) => setField("phone", maskPhone(value))}
              onBlur={() => handleBlur("phone")}
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
                onBlur={() => handleBlur("phone2")}
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
            onBlur={() => handleBlur("email")}
            autoComplete="email"
            error={errors.email}
            className="sm:col-span-2"
          />

          <FloatingField
            id="document"
            label={config.documentLabel}
            required
            value={values.document}
            onValueChange={(value) => setField("document", maskDocument(value))}
            onBlur={() => handleBlur("document")}
            inputMode="numeric"
            autoComplete="off"
            mono
            error={errors.document}
            hint={config.documentHint ?? undefined}
            accessory={
              config.allowCnpj && documentKind ? (
                documentKind === "cnpj" ? (
                  <FieldChip icon={Building2} label="CNPJ" />
                ) : (
                  <FieldChip icon={IdCard} label="CPF" />
                )
              ) : null
            }
            className="sm:col-span-2"
          />

          <AuthSelectField
            id="state"
            label="Estado"
            required
            value={values.state}
            onValueChange={(value) => setField("state", value)}
            onBlur={() => handleBlur("state")}
            options={STATES}
            error={errors.state}
          />

          <FloatingField
            id="city"
            label="Cidade"
            required
            value={values.city}
            onValueChange={(value) => setField("city", value)}
            onBlur={() => handleBlur("city")}
            autoComplete="address-level2"
            error={errors.city}
          />

          {status === "invalid" ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-xs font-medium leading-relaxed text-destructive sm:col-span-2"
            >
              <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden />
              Não foi possível salvar: preencha corretamente os campos obrigatórios destacados.
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
              {loading ? "Salvando…" : "Salvar alterações"}
            </span>
          </Button>

          {status === "saved" ? (
            <p
              role="status"
              className="flex items-start gap-2 rounded-xl border border-gold-500/30 bg-brown-100/60 px-3.5 py-3 text-xs leading-relaxed text-brown-700 sm:col-span-2"
            >
              <BadgeCheck className="mt-px h-4 w-4 shrink-0 text-gold-700" aria-hidden />
              {photoUrl
                ? "Dados validados. Ainda falta conectar o backend para salvar as alterações do perfil e armazenar a foto."
                : "Dados validados. Ainda falta conectar o backend para salvar as alterações do perfil."}
            </p>
          ) : null}
        </form>
      </section>
    </div>
  );
};

export default ProfileForm;
