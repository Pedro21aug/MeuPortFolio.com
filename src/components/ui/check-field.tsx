import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckFieldProps {
  id: string;
  name?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

/** Checkbox personalizado do design system: preenchimento, brilho dourado e check animado. */
const CheckField = ({
  id,
  name,
  checked,
  onCheckedChange,
  label,
  description,
  className,
}: CheckFieldProps) => (
  <label
    htmlFor={id}
    className={cn("group inline-flex cursor-pointer select-none items-start gap-2.5", className)}
  >
    <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
      <input
        id={id}
        name={name ?? id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="peer h-5 w-5 appearance-none rounded-[7px] border border-input bg-card shadow-xs transition-all duration-200 ease-out hover:border-gold-500/60 active:scale-90 checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/25"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[7px] ring-0 ring-gold-400/0 transition-all duration-200 ease-out peer-checked:ring-4 peer-checked:ring-gold-400/25"
      />

      <Check
        aria-hidden
        className="pointer-events-none absolute h-3.5 w-3.5 scale-50 text-primary-foreground opacity-0 transition-all duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100"
      />
    </span>

    <span className="flex flex-col gap-0.5">
      <span className="text-body-s font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
        {label}
      </span>
      {description ? (
        <span className="text-[11px] leading-tight text-muted-foreground">{description}</span>
      ) : null}
    </span>
  </label>
);

export default CheckField;
