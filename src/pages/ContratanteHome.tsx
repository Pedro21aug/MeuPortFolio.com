import AreaLayout from "@/components/area/area-layout";
import SearchBar from "@/components/contractor/search-bar";
import { CONTRACTOR_NAV_ITEMS } from "@/lib/site-nav";

/** Página inicial do contratante: busca de profissionais em destaque. */
const ContratanteHome = () => (
  <AreaLayout items={CONTRACTOR_NAV_ITEMS} homeHref="/contratante">
    <SearchBar />
  </AreaLayout>
);

export default ContratanteHome;
