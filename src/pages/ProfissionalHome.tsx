import AreaLayout from "@/components/area/area-layout";
import PortfolioCta from "@/components/area/portfolio-cta";
import { PROFESSIONAL_NAV_ITEMS } from "@/lib/site-nav";

/** Página inicial do profissional: criar portfólio. */
const ProfissionalHome = () => (
  <AreaLayout items={PROFESSIONAL_NAV_ITEMS} homeHref="/profissional">
    <PortfolioCta />
  </AreaLayout>
);

export default ProfissionalHome;
