import { Check } from "lucide-react";

import { PASSWORD_REQUIREMENTS } from "@/lib/account-validation";
import { cn } from "@/lib/utils";

interface PasswordRequirementsProps {
  password: string;
}

/** Requisitos da senha com feedback imediato enquanto o usuário digita. */
const PasswordRequirements = ({ password }: PasswordRequirementsProps) => (
  <span className="flex flex-wrap items-center gap-1.5">
    {PASSWORD_REQUIREMENTS.map((requirement) => {
      const met = requirement.test(password);

      return (
        <span
          key={requirement.id}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors duration-200 ease-out",
            met
              ? "border-gold-500/40 bg-brown-100/70 text-brown-700"
              : "border-input bg-secondary/60 text-muted-foreground",
          )}
        >
          {met ? (
            <Check className="h-3 w-3 shrink-0 text-gold-700" aria-hidden />
          ) : (
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
          )}
          {requirement.label}
        </span>
      );
    })}
  </span>
);

export default PasswordRequirements;
