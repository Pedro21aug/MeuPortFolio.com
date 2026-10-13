import ContactDetails from "@/components/public/contact-details";
import ContactForm from "@/components/public/contact-form";
import PublicPageLayout from "@/components/public/public-page-layout";

/** Página "Contato". */
const Contato = () => (
  <PublicPageLayout>
    <h1 className="font-display text-display-s text-balance text-canvas-foreground">Contato</h1>
    <p className="mt-5 max-w-2xl text-body-l text-canvas-muted">
      Precisa de ajuda para encontrar um profissional, criar seu portfólio ou entender como
      funciona? Envie a sua mensagem — a gente responde.
    </p>

    <div className="mt-12 grid items-start gap-5 lg:grid-cols-[1.15fr_1fr]">
      <ContactForm />
      <ContactDetails />
    </div>
  </PublicPageLayout>
);

export default Contato;
