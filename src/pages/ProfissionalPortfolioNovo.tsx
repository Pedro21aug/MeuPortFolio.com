import AreaLayout from "@/components/area/area-layout";
import PortfolioForm from "@/components/area/portfolio-form";
import { useNavigate } from "react-router-dom";
import { PROFESSIONAL_NAV_ITEMS } from "@/lib/site-nav";

/** Cadastro do portfólio do profissional. */
const ProfissionalPortfolioNovo = () => {
  const navigate = useNavigate();

  return (
    <AreaLayout items={PROFESSIONAL_NAV_ITEMS} homeHref="/profissional">
      <PortfolioForm onBack={() => navigate("/profissional/portfolios")} />
    </AreaLayout>
  );
};

export default ProfissionalPortfolioNovo;
