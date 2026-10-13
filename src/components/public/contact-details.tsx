import { Mail, MessageSquare } from "lucide-react";

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@meuportofolio.com",
  },
];

/** Canais de contato exibidos ao lado do formulário. */
const ContactDetails = () => (
  <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-8">
    <span aria-hidden className="absolute inset-x-8 top-0 h-px hairline" />

    <span
      aria-hidden
      className="grid h-11 w-11 place-items-center rounded-2xl bg-brown-100 text-brown-700"
    >
      <MessageSquare className="h-5 w-5" />
    </span>

    <h2 className="mt-4 font-display text-headline-s text-foreground">Fale com a gente</h2>
    <p className="mt-2 text-body-s text-muted-foreground">
      Dúvidas sobre o cadastro, o portfólio ou o uso da plataforma? Escolha o melhor canal ou envie
      a sua mensagem ao lado.
    </p>

    <ul className="mt-6 space-y-5">
      {CONTACT_CHANNELS.map(({ icon: Icon, label, value }) => (
        <li key={label} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-secondary text-brown-600"
          >
            <Icon className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              {label}
            </span>
            <span className="mt-1 block text-body-s font-medium text-foreground">{value}</span>
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default ContactDetails;
