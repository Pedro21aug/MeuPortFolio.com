import * as React from "react";
import { ChevronLeft, Loader2, MailCheck, RefreshCw } from "lucide-react";

import CodeInput from "@/components/auth/code-input";

const CODE_LENGTH = 6;

interface CodeVerificationFormProps {
  email: string;
  onChangeEmail: () => void;
  onVerified: () => void;
}

/** Verificação do código de 6 dígitos enviado por e-mail. */
const CodeVerificationForm = ({
  email,
  onChangeEmail,
  onVerified,
}: CodeVerificationFormProps) => {
  const [code, setCode] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "verifying">("idle");
  const [resendNotice, setResendNotice] = React.useState(false);

  const handleComplete = (value: string) => {
    if (value.length !== CODE_LENGTH || status !== "idle") return;

    setStatus("verifying");
    window.setTimeout(onVerified, 900);
  };

  const handleChange = (value: string) => {
    setCode(value);
    setResendNotice(false);
    if (status !== "idle") setStatus("idle");
  };

  const verifying = status === "verifying";

  return (
    <div className="relative w-full max-w-[440px] animate-fade-up">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
      />

      <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

        <h2 className="font-display text-headline-l text-foreground">Verificar código</h2>
        <p className="mt-3 text-body-s text-muted-foreground">
          Digite o código de {CODE_LENGTH} dígitos que enviamos para{" "}
          <span className="font-medium text-foreground">{email || "seu e-mail"}</span>.
        </p>

        <div className="mt-8">
          <CodeInput
            id="verification-code"
            length={CODE_LENGTH}
            value={code}
            onValueChange={handleChange}
            onComplete={handleComplete}
            disabled={verifying}
          />
        </div>

        {verifying ? (
          <p
            role="status"
            className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground"
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin text-gold-700" aria-hidden />
            Verificando código…
          </p>
        ) : null}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setResendNotice(true)}
            className="focus-gold inline-flex items-center gap-2 rounded text-body-s font-medium text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Não recebi o código
          </button>

          {resendNotice ? (
            <p
              role="status"
              className="mt-4 flex items-start gap-2 rounded-xl border border-gold-500/30 bg-brown-100/60 px-3.5 py-3 text-left text-xs leading-relaxed text-brown-700"
            >
              <MailCheck className="mt-px h-4 w-4 shrink-0 text-gold-700" aria-hidden />
              O reenvio precisa do backend para gerar um novo código. Por enquanto, confira também
              sua caixa de spam.
            </p>
          ) : null}
        </div>

        <div className="mt-8 h-px w-full bg-border" />

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onChangeEmail}
            className="focus-gold inline-flex items-center gap-2 rounded font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Alterar e-mail
          </button>
        </div>
      </section>
    </div>
  );
};

export default CodeVerificationForm;
