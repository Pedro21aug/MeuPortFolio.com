import * as React from "react";
import { ArrowRight, ChevronLeft, Loader2 } from "lucide-react";

import FloatingField from "@/components/auth/auth-floating-field";
import { Button } from "@/components/ui/button";
import { isValidEmail } from "@/lib/br-documents";
import { cn } from "@/lib/utils";

interface PasswordRecoveryFormProps {
  onBack: () => void;
  onCodeSent: (email: string) => void;
}

/** Recuperação de senha: informa o e-mail cadastrado para receber o código. */
const PasswordRecoveryForm = ({ onBack, onCodeSent }: PasswordRecoveryFormProps) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const validate = (value: string) =>
    isValidEmail(value) ? null : "Confira o formato do e-mail informado.";

  const handleChange = (value: string) => {
    setEmail(value);
    if (error) setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextError = validate(email);
    setError(nextError);

    if (nextError) {
      document.getElementById("recovery-email")?.focus({ preventScroll: true });
      return;
    }

    setLoading(true);
    window.setTimeout(() => onCodeSent(email.trim()), 900);
  };

  return (
    <div className="relative w-full max-w-[440px] animate-fade-up">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
      />

      <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

        <h2 className="font-display text-headline-l text-foreground">Recuperar senha</h2>
        <p className="mt-3 text-body-s text-muted-foreground">
          Informe o e-mail cadastrado e enviaremos um código para você criar uma nova senha.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <FloatingField
            id="recovery-email"
            label="E-mail cadastrado"
            required
            type="email"
            inputMode="email"
            value={email}
            onValueChange={handleChange}
            onBlur={() => setError(validate(email))}
            autoComplete="email"
            error={error}
          />

          <Button
            type="submit"
            variant="premium"
            size="xl"
            disabled={loading}
            className={cn(
              "group relative w-full overflow-hidden",
              !loading && "hover:-translate-y-px",
            )}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
            />
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            <span className="relative tracking-[0.01em]">
              {loading ? "Enviando…" : "Enviar código"}
            </span>
            {!loading ? (
              <ArrowRight
                aria-hidden
                className="relative h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            ) : null}
          </Button>

          <p className="text-xs leading-relaxed text-muted-foreground">
            O código expira em 15 minutos.
          </p>
        </form>

        <div className="mt-8 h-px w-full bg-border" />

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onBack}
            className="focus-gold inline-flex items-center gap-2 rounded font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Voltar para o login
          </button>
        </div>
      </section>
    </div>
  );
};

export default PasswordRecoveryForm;
