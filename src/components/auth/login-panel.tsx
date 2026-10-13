import * as React from "react";
import { ArrowRight, Eye, EyeOff, IdCard, Info, Loader2, Mail } from "lucide-react";

import FloatingField from "@/components/auth/auth-floating-field";
import FieldChip from "@/components/auth/field-chip";
import { Button } from "@/components/ui/button";
import CheckField from "@/components/ui/check-field";
import {
  detectIdentifier,
  maskCpf,
  validateIdentifier,
} from "@/lib/br-documents";
import { cn } from "@/lib/utils";

interface LoginPanelProps {
  onCreateAccount: () => void;
  onForgotPassword: () => void;
  /** Chamado após a validação bem-sucedida do formulário. */
  onLoggedIn: () => void;
}

const LoginPanel = ({ onCreateAccount, onForgotPassword, onLoggedIn }: LoginPanelProps) => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [identifierError, setIdentifierError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const kind = detectIdentifier(identifier);

  const handleIdentifierChange = (value: string) => {
    const looksLikeCpf = !value.includes("@");
    setIdentifier(looksLikeCpf ? maskCpf(value) : value);
    if (identifierError) setIdentifierError(null);
    if (loading) setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextIdentifierError = validateIdentifier(identifier);
    const nextPasswordError = password.length === 0 ? "Informe a sua senha." : null;

    setIdentifierError(nextIdentifierError);
    setPasswordError(nextPasswordError);

    if (nextIdentifierError || nextPasswordError) {
      setLoading(false);
      return;
    }

    setLoading(true);
    window.setTimeout(onLoggedIn, 900);
  };

  return (
    <div className="relative w-full max-w-[440px] animate-fade-up">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
      />

      <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
        <span
          aria-hidden
          className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline"
        />

        <h2 className="font-display text-headline-l text-foreground">Acesse sua conta</h2>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <FloatingField
            id="identifier"
            label="E-mail ou CPF"
            value={identifier}
            onValueChange={handleIdentifierChange}
            autoComplete="username"
            mono={kind === "cpf"}
            error={identifierError}
            accessory={
              kind === "cpf" ? (
                <FieldChip icon={IdCard} label="CPF" />
              ) : kind === "email" ? (
                <FieldChip icon={Mail} label="E-mail" />
              ) : null
            }
            hint={
              <>
                Digite seu e-mail ou os números do CPF.{" "}
                <span className="font-mono">000.000.000-00</span>
              </>
            }
          />

          <FloatingField
            id="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onValueChange={(value) => {
              setPassword(value);
              if (passwordError) setPasswordError(null);
              if (loading) setLoading(false);
            }}
            autoComplete="current-password"
            error={passwordError}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="focus-gold rounded-md p-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden />
                )}
              </button>
            }
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <CheckField
              id="remember"
              checked={remember}
              onCheckedChange={setRemember}
              label="Lembrar de mim"
              description="Manter a sessão aberta"
            />

            <button
              type="button"
              onClick={onForgotPassword}
              className="focus-gold rounded text-body-s font-medium text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
            >
              Esqueci minha senha
            </button>
          </div>

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
              {loading ? "Entrando…" : "Entrar"}
            </span>
            {!loading ? (
              <ArrowRight
                aria-hidden
                className="relative h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            ) : null}
          </Button>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-px h-3.5 w-3.5 shrink-0 text-gold-700" aria-hidden />
            Seus dados são usados apenas para autenticação. Nunca compartilhamos seu CPF.
          </p>
        </form>

        <div className="mt-8 h-px w-full bg-border" />

        <p className="mt-6 text-center text-body-s text-muted-foreground">
          Ainda não tem conta?{" "}
          <button
            type="button"
            onClick={onCreateAccount}
            className="focus-gold rounded font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
          >
            Criar conta
          </button>
        </p>
      </section>
    </div>
  );
};

export default LoginPanel;
