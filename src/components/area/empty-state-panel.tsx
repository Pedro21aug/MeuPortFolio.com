import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface EmptyStatePanelProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyText: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Painel com estado vazio e ação de destaque, usado nas telas da área logada. */
const EmptyStatePanel = ({
  title,
  subtitle,
  icon: Icon,
  emptyTitle,
  emptyText,
  ctaLabel,
  ctaHref,
}: EmptyStatePanelProps) => (
  <section className="relative mx-auto w-full max-w-[620px] animate-fade-up overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 text-center shadow-card sm:p-9 2xl:max-w-[720px]">
    <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

    <h2 className="font-display text-headline-l text-foreground">{title}</h2>
    <p className="mt-3 text-body-s text-muted-foreground">{subtitle}</p>

    <div className="mt-10 flex flex-col items-center">
      <span
        aria-hidden
        className="grid h-16 w-16 place-items-center rounded-full bg-brown-100 text-brown-500"
      >
        <Icon className="h-7 w-7" />
      </span>

      <p className="mt-5 font-display text-headline-s text-foreground">{emptyTitle}</p>
      <p className="mt-2 max-w-sm text-body-s text-muted-foreground">{emptyText}</p>

      <Button
        asChild
        variant="premium"
        size="xl"
        className="group relative mt-8 overflow-hidden hover:-translate-y-px"
      >
        <Link to={ctaHref}>
          <span
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
          />
          <span className="relative tracking-[0.01em]">{ctaLabel}</span>
        </Link>
      </Button>
    </div>
  </section>
);

export default EmptyStatePanel;
