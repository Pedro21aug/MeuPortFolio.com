import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AccountAvatar from "@/components/area/account-avatar";
import AccountPhotoProvider from "@/components/area/account-photo-provider";
import SignOutDialog from "@/components/area/sign-out-dialog";
import AuthCanvas from "@/components/auth/auth-canvas";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { homeNavItem, type NavAction, type NavItem } from "@/lib/site-nav";

interface AreaLayoutProps {
  /** Itens do menu da área logada. */
  items: NavItem[];
  /** Rota inicial da área; usada para o item "Início". */
  homeHref: string;
  children: React.ReactNode;
}

/**
 * Moldura das áreas logadas (contratante e profissional).
 * No cabeçalho, o nome do site dá lugar ao avatar da conta; fora da tela
 * inicial, o menu ganha o item "Início" para voltar.
 */
const AreaLayout = ({ items, homeHref, children }: AreaLayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [signOutOpen, setSignOutOpen] = React.useState(false);

  const isHome = pathname.replace(/\/$/, "") === homeHref;
  const menuItems = isHome ? items : [homeNavItem(homeHref), ...items];

  const handleAction = (action: NavAction) => {
    if (action === "sign-out") setSignOutOpen(true);
  };

  return (
    <AccountPhotoProvider>
      <AuthCanvas>
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            items={menuItems}
            onAction={handleAction}
            right={<AccountAvatar href={`${homeHref}/perfil`} />}
          />

          <main className="flex flex-1 items-center">
            <section className="mx-auto w-full max-w-4xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-20 xl:max-w-5xl 2xl:max-w-6xl">
              {children}
            </section>
          </main>

          <SiteFooter />
        </div>

        <SignOutDialog
          open={signOutOpen}
          onOpenChange={setSignOutOpen}
          onConfirm={() => navigate("/")}
        />
      </AuthCanvas>
    </AccountPhotoProvider>
  );
};

export default AreaLayout;
