import { Link } from "react-router-dom";

import type { LegalDocument } from "@/lib/legal-content";

interface LegalDocumentViewProps {
  document: LegalDocument;
}

/** Renderização dos documentos legais (termos, privacidade e LGPD). */
const LegalDocumentView = ({ document }: LegalDocumentViewProps) => (
  <article className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
    <span aria-hidden className="absolute inset-x-10 top-0 h-px hairline" />

    <header>
      <h1 className="font-display text-display-s text-balance text-foreground">{document.title}</h1>
      <p className="mt-3 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
        Última atualização: {document.updatedAt}
      </p>
      <p className="mt-5 max-w-2xl text-body-l text-muted-foreground">{document.intro}</p>
    </header>

    <div className="mt-10 space-y-8">
      {document.sections.map((section, index) => (
        <section key={section.title}>
          <h2 className="flex items-baseline gap-2 font-display text-headline-s text-foreground">
            <span aria-hidden className="text-gold-700">
              {index + 1}.
            </span>
            {section.title}
          </h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body-s leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>

    <p className="mt-10 border-t border-border pt-6 text-body-s text-muted-foreground">
      Dúvidas sobre este documento? Fale com a gente pela{" "}
      <Link
        to="/contato"
        className="focus-gold rounded font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors duration-200 hover:decoration-gold-700"
      >
        página de Contato
      </Link>
      .
    </p>
  </article>
);

export default LegalDocumentView;
