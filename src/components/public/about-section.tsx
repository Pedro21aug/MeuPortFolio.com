import { Handshake, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const VALUES = [
  {
    icon: Search,
    title: "Curadoria de profissionais",
    text: "Perfis com portfólio, atividades, duração e referências para você decidir com segurança.",
  },
  {
    icon: Handshake,
    title: "Contato direto",
    text: "Contratante e profissional conversam e combinam o trabalho diretamente entre si, sem intermediários.",
  },
  {
    icon: Sparkles,
    title: "Suporte próximo",
    text: "Um time disponível para apoiar contratantes e profissionais em cada etapa do projeto.",
  },
];

/** Conteúdo da página "Sobre nós". */
const AboutSection = () => (
  <div>
    <h1 className="font-display text-display-s text-balance text-canvas-foreground">Sobre nós</h1>

    <p className="mt-5 max-w-2xl text-body-l text-canvas-muted">
      O MeuPortfólio.com existe para aproximar quem precisa de um serviço de quem faz bem feito.
      Aqui o contratante encontra profissionais com portfólio e o profissional autônomo é encontrado
      por quem procura o seu trabalho.
    </p>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {VALUES.map(({ icon: Icon, title, text }) => (
        <section
          key={title}
          className="relative overflow-hidden rounded-2xl border border-canvas-foreground/60 bg-card p-6 shadow-card"
        >
          <span aria-hidden className="absolute inset-x-8 top-0 h-px hairline" />

          <span
            aria-hidden
            className="grid h-11 w-11 place-items-center rounded-2xl bg-brown-100 text-brown-700"
          >
            <Icon className="h-5 w-5" />
          </span>

          <h2 className="mt-4 font-display text-headline-s text-foreground">{title}</h2>
          <p className="mt-2 text-body-s text-muted-foreground">{text}</p>
        </section>
      ))}
    </div>

    <section className="relative mt-12 overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
      <span aria-hidden className="absolute inset-x-10 top-0 h-px hairline" />

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-headline-l text-foreground">Pronto para começar?</h2>
          <p className="mt-2 max-w-md text-body-s text-muted-foreground">
            Crie sua conta gratuitamente como contratante ou como profissional autônomo.
          </p>
        </div>

        <Button
          asChild
          variant="premium"
          size="xl"
          className="group relative shrink-0 overflow-hidden hover:-translate-y-px"
        >
          <Link to="/">
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
            />
            <span className="relative tracking-[0.01em]">Criar conta</span>
          </Link>
        </Button>
      </div>
    </section>
  </div>
);

export default AboutSection;
