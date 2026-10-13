import * as React from "react";
import { useLocation } from "react-router-dom";

import AuthCanvas from "@/components/auth/auth-canvas";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { PUBLIC_NAV_ITEMS, homeNavItem } from "@/lib/site-nav";

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Moldura das páginas públicas (sobre nós, contato).
 * Fora da tela de acesso, o menu ganha o item "Início" para voltar ao login.
 * A navegação é feita pelo router (SPA), sem recarregar a página.
 */
const PublicPageLayout = ({ children }: PublicPageLayoutProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const items = isHome
    ? PUBLIC_NAV_ITEMS
    : [homeNavItem("/", "Voltar para a tela de login"), ...PUBLIC_NAV_ITEMS];

  return (
    <AuthCanvas>
      <div className="flex min-h-screen flex-col">
        <SiteHeader items={items} />

        <main className="flex flex-1 items-center">
          <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-20 2xl:max-w-6xl">
            {children}
          </section>
        </main>

        <SiteFooter />
      </div>
    </AuthCanvas>
  );
};

export default PublicPageLayout;
