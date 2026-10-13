import { ArrowRight, Briefcase, Building2, ChevronLeft } from "lucide-react";

import type { AccountType } from "@/lib/account-profile";

export type { AccountType };

interface AccountTypePickerProps {
  onContinue: (type: AccountType) => void;
  onBack: () => void;
}

const ACCOUNT_TYPES: {
  id: AccountType;
  title: string;
  description: string;
  icon: typeof Building2;
}[] = [
  {
    id: "contratante",
    title: "Sou contratante",
    description: "Encontre profissionais autônomos verificados para os seus projetos.",
    icon: Building2,
  },
  {
    id: "profissional",
    title: "Sou profissional",
    description:
      "Monte seu portfólio e seja encontrado por contratantes que procuram o seu trabalho.",
    icon: Briefcase,
  },
];

/** Escolha do tipo de conta, exibida no centro da tela após "Criar conta". */
const AccountTypePicker = ({ onContinue, onBack }: AccountTypePickerProps) => (
  <div className="mx-auto w-full max-w-[880px] text-center">
    <h2 className="font-display text-display-s text-balance text-canvas-foreground">
      Qual é o seu perfil?
    </h2>
    <p className="mx-auto mt-4 max-w-md text-body-l text-canvas-muted">
      Escolha como você vai usar o MeuPortfólio
    </p>

      <div className="mt-10 grid gap-5 text-left sm:grid-cols-2">
      {ACCOUNT_TYPES.map(({ id, title, description, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onContinue(id)}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 text-left shadow-card transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:p-8"
        >
          <span aria-hidden className="absolute inset-x-8 top-0 h-px hairline" />

          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brown-100 text-brown-700 transition-colors duration-200 group-hover:bg-gold-500/20 group-hover:text-gold-700">
            <Icon className="h-5 w-5" aria-hidden />
          </span>

          <span className="mt-5 block font-display text-headline-s text-foreground">{title}</span>
          <span className="mt-2 block text-body-s text-muted-foreground">{description}</span>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-body-s font-semibold text-gold-700">
            Continuar
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </span>
        </button>
      ))}
    </div>

    <button
      type="button"
      onClick={onBack}
      className="focus-gold mt-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-body-s font-medium text-canvas-muted transition-colors duration-200 hover:text-gold-300"
    >
      <ChevronLeft className="h-4 w-4" aria-hidden />
      Voltar para o login
    </button>
  </div>
);

export default AccountTypePicker;
