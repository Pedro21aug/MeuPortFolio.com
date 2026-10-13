import * as React from "react";
import { CheckCircle2 } from "lucide-react";

const REDIRECT_DELAY = 3600;

interface PasswordChangedPanelProps {
  onDone: () => void;
}

/** Confirmação de senha alterada, com retorno automático para o login. */
const PasswordChangedPanel = ({ onDone }: PasswordChangedPanelProps) => {
  const onDoneRef = React.useRef(onDone);

  React.useEffect(() => {
    onDoneRef.current = onDone;
  });

  React.useEffect(() => {
    const timer = window.setTimeout(() => onDoneRef.current(), REDIRECT_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[440px] animate-fade-up">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
      />

      <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

        <div role="status" className="flex flex-col items-center text-center">
          <span className="relative grid place-items-center">
            <span
              aria-hidden
              className="absolute -inset-4 animate-pulse-glow rounded-full bg-success/20 blur-2xl"
            />
            <span className="relative grid h-20 w-20 animate-pop-in place-items-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
            </span>
          </span>

          <h2 className="mt-7 font-display text-headline-l text-foreground">
            Senha alterada com sucesso!
          </h2>
          <p className="mt-3 text-body-s text-muted-foreground">Voltando para a tela de login</p>
        </div>
      </section>
    </div>
  );
};

export default PasswordChangedPanel;
