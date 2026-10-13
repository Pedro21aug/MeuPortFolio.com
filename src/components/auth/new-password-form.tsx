import * as React from "react";
import { AlertCircle, ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import FloatingField from "@/components/auth/auth-floating-field";
import PasswordRequirements from "@/components/auth/password-requirements";
import { Button } from "@/components/ui/button";
import { validatePasswordField } from "@/lib/account-validation";
import { cn } from "@/lib/utils";

type FieldName = "password" | "confirm";

const FIELD_IDS: Record<FieldName, string> = {
  password: "new-password",
  confirm: "new-password-confirm",
};

interface NewPasswordFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

/** Criação da nova senha após a verificação do código. */
const NewPasswordForm = ({ onBack, onSuccess }: NewPasswordFormProps) => {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [errors, setErrors] = React.useState<Partial<Record<FieldName, string>>>({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);

  const validateField = (
    field: FieldName,
    values: { password: string; confirm: string },
  ): string | undefined => {
    if (field === "password") {
      return validatePasswordField("password", values.password, values.confirm);
    }

    return validatePasswordField("confirm", values.password, values.confirm);
  };

  const validate = () => {
    const values = { password, confirm };
    const next: Partial<Record<FieldName, string>> = {};

    (Object.keys(FIELD_IDS) as FieldName[]).forEach((field) => {
      const message = validateField(field, values);
      if (message) next[field] = message;
    });

    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(FIELD_IDS) as FieldName[]).find(
      (field) => nextErrors[field],
    );

    if (firstInvalid) {
      setShowSummary(true);
      const element = document.getElementById(FIELD_IDS[firstInvalid]);
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setShowSummary(false);
    setLoading(true);
    window.setTimeout(onSuccess, 900);
  };

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
    <div className="relative w-full max-w-[440px] animate-fade-up">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
      />

      <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

        <h2 className="font-display text-headline-l text-foreground">Criar nova senha</h2>
        <p className="mt-3 text-body-s text-muted-foreground">
          Escolha uma nova senha de acesso para a sua conta.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <FloatingField
            id={FIELD_IDS.password}
            label="Nova senha"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onValueChange={(value) => {
              setPassword(value);
              setErrors((previous) => ({ ...previous, password: undefined }));
            }}
            onBlur={() => setErrors((previous) => ({ ...previous, password: validateField("password", { password, confirm }) }))}
            autoComplete="new-password"
            error={errors.password}
            hint={<PasswordRequirements password={password} />}
            trailing={passwordToggle(showPassword, () => setShowPassword((v) => !v), "nova senha")}
          />

          <FloatingField
            id={FIELD_IDS.confirm}
            label="Confirmar senha"
            required
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onValueChange={(value) => {
              setConfirm(value);
              setErrors((previous) => ({ ...previous, confirm: undefined }));
            }}
            onBlur={() => setErrors((previous) => ({ ...previous, confirm: validateField("confirm", { password, confirm }) }))}
            autoComplete="new-password"
            error={errors.confirm}
            trailing={passwordToggle(
              showConfirm,
              () => setShowConfirm((v) => !v),
              "confirmação de senha",
            )}
          />

          {showSummary ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-xs font-medium leading-relaxed text-destructive"
            >
              <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden />
              Não foi possível alterar: preencha corretamente os campos obrigatórios destacados.
            </p>
          ) : null}

          <Button
            type="submit"
            variant="premium"
            size="xl"
            disabled={loading}
            className={cn("group relative w-full overflow-hidden", !loading && "hover:-translate-y-px")}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
            />
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            <span className="relative tracking-[0.01em]">
              {loading ? "Alterando…" : "Alterar senha"}
            </span>
          </Button>
        </form>

        <div className="mt-8 h-px w-full bg-border" />

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onBack}
            className="focus-gold inline-flex items-center gap-2 rounded font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Voltar
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewPasswordForm;
