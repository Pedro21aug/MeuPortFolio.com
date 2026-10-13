import { FolderOpen } from "lucide-react";

import EmptyStatePanel from "@/components/area/empty-state-panel";

/** Portfólios publicados pelo profissional. */
const PortfoliosPanel = () => (
  <EmptyStatePanel
    title="Meus Portfólios"
    subtitle="Os trabalhos que você publica para os contratantes encontrarem você."
    icon={FolderOpen}
    emptyTitle="Você ainda não tem portfólios"
    emptyText="Crie seu primeiro portfólio para mostrar seus trabalhos e receber convites de contratantes."
    ctaLabel="Criar portfólio"
    ctaHref="/profissional/portfolios/novo"
  />
);

export default PortfoliosPanel;
