import ContratanteHome from "./pages/ContratanteHome";
import ContratantePerfil from "./pages/ContratantePerfil";
import Contato from "./pages/Contato";
import Index from "./pages/Index";
import Lgpd from "./pages/Lgpd";
import NotFound from "./pages/NotFound";
import Privacidade from "./pages/Privacidade";
import ProfissionalHome from "./pages/ProfissionalHome";
import ProfissionalPerfil from "./pages/ProfissionalPerfil";
import ProfissionalPortfolioNovo from "./pages/ProfissionalPortfolioNovo";
import ProfissionalPortfolios from "./pages/ProfissionalPortfolios";
import SobreNos from "./pages/SobreNos";
import Termos from "./pages/Termos";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Index />,
  },
  {
    path: "/sobre-nos",
    name: "sobre-nos",
    element: <SobreNos />,
  },
  {
    path: "/contato",
    name: "contato",
    element: <Contato />,
  },
  {
    path: "/termos",
    name: "termos",
    element: <Termos />,
  },
  {
    path: "/privacidade",
    name: "privacidade",
    element: <Privacidade />,
  },
  {
    path: "/lgpd",
    name: "lgpd",
    element: <Lgpd />,
  },
  {
    path: "/contratante",
    name: "contratante",
    element: <ContratanteHome />,
  },
  {
    path: "/contratante/perfil",
    name: "contratante-perfil",
    element: <ContratantePerfil />,
  },
  {
    path: "/profissional",
    name: "profissional",
    element: <ProfissionalHome />,
  },
  {
    path: "/profissional/portfolios",
    name: "profissional-portfolios",
    element: <ProfissionalPortfolios />,
  },
  {
    path: "/profissional/portfolios/novo",
    name: "profissional-portfolio-novo",
    element: <ProfissionalPortfolioNovo />,
  },
  {
    path: "/profissional/perfil",
    name: "profissional-perfil",
    element: <ProfissionalPerfil />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
