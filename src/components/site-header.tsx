import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

import BrandWordmark from "@/components/auth/brand-wordmark";
import { PUBLIC_NAV_ITEMS, type NavAction, type NavItem } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  items?: NavItem[];
  /** Executa ações de menu, como sair da conta. */
  onAction?: (action: NavAction) => void;
  /** Conteúdo à direita do cabeçalho; por padrão, o nome do site. */
  right?: React.ReactNode;
}

const isInternalPath = (href: string) => href.startsWith("/");

const SiteHeader = ({ items = PUBLIC_NAV_ITEMS, onAction, right }: SiteHeaderProps) => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeMenus = () => {
    setNavOpen(false);
    setMobileOpen(false);
  };

  const handleSelect = (item: NavItem) => {
    closeMenus();
    if (item.action) onAction?.(item.action);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-canvas-foreground/[0.08] bg-canvas/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 2xl:max-w-[1800px]">
        {/* ESQUERDA — menu de navegação */}
        <div className="flex items-center">
          <nav
            aria-label="Navegação principal"
            className="relative hidden md:block"
            onMouseEnter={() => setNavOpen(true)}
            onMouseLeave={() => setNavOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={navOpen}
              aria-label={navOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              onClick={() => setNavOpen((open) => !open)}
              onFocus={() => setNavOpen(true)}
              className={cn(
                "focus-gold inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ease-out",
                navOpen
                  ? "border-gold-400/50 bg-canvas-foreground/[0.08] text-gold-300"
                  : "border-canvas-foreground/15 text-canvas-foreground hover:border-gold-400/50 hover:bg-canvas-foreground/[0.06] hover:text-gold-300",
              )}
            >
              <span className="sr-only">Navegação</span>
              {navOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>

            <div
              className={cn(
                "absolute left-0 top-full z-50 w-72 pt-3 transition-all duration-200 ease-out",
                navOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0",
              )}
            >
              <ul className="relative overflow-hidden rounded-2xl border border-canvas-foreground/10 bg-brown-800/95 p-2 shadow-card backdrop-blur-xl">
                <span aria-hidden className="absolute inset-x-5 top-0 h-px hairline" />

                {items.map((item) => {
                  const content = (
                    <>
                      <span>
                        <span className="block text-sm font-medium text-canvas-foreground">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-canvas-muted">
                          {item.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="mt-1 h-3.5 w-3.5 -translate-x-1 text-gold-400 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                      />
                    </>
                  );

                  const className =
                    "focus-gold group/item flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 hover:bg-canvas-foreground/[0.07]";

                  return (
                    <li key={item.label}>
                      {item.action ? (
                        <button type="button" onClick={() => handleSelect(item)} className={className}>
                          {content}
                        </button>
                      ) : isInternalPath(item.href ?? "") ? (
                        <Link to={item.href!} onClick={() => handleSelect(item)} className={className}>
                          {content}
                        </Link>
                      ) : (
                        <a href={item.href} onClick={() => handleSelect(item)} className={className}>
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="focus-gold inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas-foreground/15 text-canvas-foreground transition-colors duration-200 hover:border-gold-400/50 hover:text-gold-300 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>

        {/* DIREITA — marca do site ou avatar da conta */}
        {right ?? <BrandWordmark />}
      </div>

      {mobileOpen ? (
        <div
          id="menu-mobile"
          className="animate-reveal-menu border-t border-canvas-foreground/10 bg-brown-900/95 px-4 pb-6 pt-3 backdrop-blur-xl md:hidden"
        >
          {items.map((item) => {
            const className =
              "focus-gold block w-full rounded-xl px-3 py-3 text-left text-base text-canvas-foreground/85 transition-colors duration-150 hover:bg-canvas-foreground/[0.07] hover:text-canvas-foreground";

            if (item.action) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={className}
                >
                  {item.label}
                </button>
              );
            }

            return isInternalPath(item.href ?? "") ? (
              <Link
                key={item.label}
                to={item.href!}
                onClick={() => handleSelect(item)}
                className={className}
              >
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} onClick={() => handleSelect(item)} className={className}>
                {item.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </header>
  );
};

export default SiteHeader;
