import AreaLayout from "@/components/area/area-layout";
import ProfileForm from "@/components/area/profile-form";
import { CONTRACTOR_NAV_ITEMS } from "@/lib/site-nav";

/** Perfil do contratante: dados da conta. */
const ContratantePerfil = () => (
  <AreaLayout items={CONTRACTOR_NAV_ITEMS} homeHref="/contratante">
    <ProfileForm profile="contratante" />
  </AreaLayout>
);

export default ContratantePerfil;
