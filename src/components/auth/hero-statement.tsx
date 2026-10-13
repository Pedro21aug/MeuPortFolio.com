import { BadgeCheck, ShieldCheck } from "lucide-react";

const TRUST_MARKERS = [
  { icon: ShieldCheck, label: "Ambiente seguro e verificado" },
  { icon: BadgeCheck, label: "Conformidade com a LGPD" },
];

/** Coluna esquerda: a frase de posicionamento da plataforma. */
const HeroStatement = () => (
  <div className="animate-fade-up-slow lg:pr-8">
    <h1 className="max-w-[18ch] font-display text-display-l text-balance text-canvas-foreground">
      Soluções estratégicas para contratantes.{" "}
      <span className="italic text-gold-gradient">Projetos de alto nível</span> para profissionais.
    </h1>

    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-body-s text-canvas-muted">
      {TRUST_MARKERS.map(({ icon: Icon, label }) => (
        <span key={label} className="inline-flex items-center gap-2">
          <Icon className="h-4 w-4 text-gold-400" aria-hidden />
          {label}
        </span>
      ))}
    </div>
  </div>
);

export default HeroStatement;
