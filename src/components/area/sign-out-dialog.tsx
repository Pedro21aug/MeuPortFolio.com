import { LogOut } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/** Confirmação de saída da conta. */
const SignOutDialog = ({ open, onOpenChange, onConfirm }: SignOutDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="max-w-[420px] gap-0 overflow-hidden rounded-3xl border-canvas-foreground/60 bg-card p-7 shadow-card sm:rounded-3xl sm:p-8">
      <span aria-hidden className="absolute inset-x-10 top-0 h-px hairline" />

      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden
          className="grid h-14 w-14 place-items-center rounded-full bg-brown-100 text-brown-600"
        >
          <LogOut className="h-6 w-6" />
        </span>

        <AlertDialogTitle className="mt-5 font-display text-headline-l text-foreground">
          Deseja mesmo sair?
        </AlertDialogTitle>
        <AlertDialogDescription className="mt-2 text-body-s text-muted-foreground">
          Você vai voltar para a tela de login e precisará informar seus dados novamente.
        </AlertDialogDescription>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <AlertDialogCancel className="mt-0 h-12 rounded-xl border-border bg-transparent px-6 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-brown-300 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-gold-400/70 focus-visible:ring-offset-card">
          Cancelar
        </AlertDialogCancel>

        <AlertDialogAction
          onClick={onConfirm}
          className="h-12 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-button transition-all duration-200 ease-out hover:-translate-y-px hover:bg-brown-800 hover:shadow-button-hover focus-visible:ring-gold-400/70 focus-visible:ring-offset-card"
        >
          Sim
        </AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialog>
);

export default SignOutDialog;
