import LegalDocumentView from "@/components/public/legal-document-view";
import PublicPageLayout from "@/components/public/public-page-layout";
import { LEGAL_DOCUMENTS } from "@/lib/legal-content";

/** Página "LGPD". */
const Lgpd = () => (
  <PublicPageLayout>
    <LegalDocumentView document={LEGAL_DOCUMENTS.lgpd} />
  </PublicPageLayout>
);

export default Lgpd;
