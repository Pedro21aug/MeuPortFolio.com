import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Termos", href: "/termos" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "LGPD", href: "/lgpd" },
];

const SiteFooter = () => (
  <footer className="relative z-10 border-t border-canvas-foreground/[0.08]">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-canvas-muted sm:flex-row sm:px-6 lg:px-8 2xl:max-w-[1800px]">
      <p>© {new Date().getFullYear()} MeuPortfólio.com — Todos os direitos reservados.</p>
      <nav aria-label="Links legais" className="flex items-center gap-5">
        {FOOTER_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className="focus-gold rounded transition-colors duration-200 hover:text-gold-300"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
