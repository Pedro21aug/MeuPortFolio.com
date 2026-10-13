import AreaLayout from "@/components/area/area-layout";
import ProfileForm from "@/components/area/profile-form";
import { PROFESSIONAL_NAV_ITEMS } from "@/lib/site-nav";

/** Perfil do profissional: dados da conta. */
const ProfissionalPerfil = () => (
  <AreaLayout items={PROFESSIONAL_NAV_ITEMS} homeHref="/profissional">
    <ProfileForm profile="profissional" />
  </AreaLayout>
);

export default ProfissionalPerfil;
