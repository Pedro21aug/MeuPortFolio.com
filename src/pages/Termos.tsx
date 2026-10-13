import LegalDocumentView from "@/components/public/legal-document-view";
import PublicPageLayout from "@/components/public/public-page-layout";
import { LEGAL_DOCUMENTS } from "@/lib/legal-content";

/** Página "Termos de uso". */
const Termos = () => (
  <PublicPageLayout>
    <LegalDocumentView document={LEGAL_DOCUMENTS.termos} />
  </PublicPageLayout>
);

export default Termos;
