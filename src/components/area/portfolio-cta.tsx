import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/** Ação central da home do profissional: criar portfólio. */
const PortfolioCta = () => (
  <Link
    to="/profissional/portfolios/novo"
    className="group relative mx-auto flex w-full max-w-[620px] animate-fade-up flex-col items-center gap-5 overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card px-8 py-12 text-center shadow-card transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:px-12 sm:py-14 xl:max-w-[720px] 2xl:max-w-[820px]"
  >
    <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

    <span className="relative grid place-items-center">
      <span
        aria-hidden
        className="absolute -inset-5 animate-pulse-glow rounded-full bg-gold-500/20 blur-2xl"
      />
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brown-100 text-brown-700 transition-colors duration-200 group-hover:bg-gold-500/20 group-hover:text-gold-700">
        <Plus className="h-6 w-6" aria-hidden />
      </span>
    </span>

    <span className="font-display text-display-s uppercase tracking-tight text-foreground">
      Criar portfólio
    </span>

    <span className="inline-flex items-center gap-1.5 text-body-s font-semibold text-gold-700">
      <Sparkles className="h-3.5 w-3.5" aria-hidden />
      Comece por aqui
    </span>
  </Link>
);

export default PortfolioCta;
