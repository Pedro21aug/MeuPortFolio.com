import AreaLayout from "@/components/area/area-layout";
import PortfoliosPanel from "@/components/area/portfolios-panel";
import { PROFESSIONAL_NAV_ITEMS } from "@/lib/site-nav";

/** Portfólios do profissional. */
const ProfissionalPortfolios = () => (
  <AreaLayout items={PROFESSIONAL_NAV_ITEMS} homeHref="/profissional">
    <PortfoliosPanel />
  </AreaLayout>
);

export default ProfissionalPortfolios;
