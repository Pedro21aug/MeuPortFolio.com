import LegalDocumentView from "@/components/public/legal-document-view";
import PublicPageLayout from "@/components/public/public-page-layout";
import { LEGAL_DOCUMENTS } from "@/lib/legal-content";

/** Página "Política de privacidade". */
const Privacidade = () => (
  <PublicPageLayout>
    <LegalDocumentView document={LEGAL_DOCUMENTS.privacidade} />
  </PublicPageLayout>
);

export default Privacidade;
