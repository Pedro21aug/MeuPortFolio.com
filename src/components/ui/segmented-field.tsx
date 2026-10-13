import * as React from "react";

import FieldMessage from "@/components/auth/field-message";
import { cn } from "@/lib/utils";

interface SegmentedFieldOption {
  value: string;
  label: string;
}

interface SegmentedFieldProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SegmentedFieldOption[];
  error?: string | null;
  hint?: React.ReactNode;
  required?: boolean;
  onBlur?: () => void;
  className?: string;
}

/** Escolha entre poucas opções, no formato de segmentos (ex.: CPF ou CNPJ). */
const SegmentedField = ({
  id,
  label,
  value,
  onValueChange,
  options,
  error,
  hint,
  required = false,
  onBlur,
  className,
}: SegmentedFieldProps) => (
  <div className={className}>
    <fieldset className="min-w-0">
      <legend className="text-body-s font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-gold-700">
            *
          </span>
        ) : null}
      </legend>

      <div className="mt-2 grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onValueChange(option.value)}
              onBlur={onBlur}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-14 items-center justify-center rounded-xl border border-input bg-card text-sm font-semibold tracking-[0.01em] text-muted-foreground transition-all duration-200 ease-out hover:border-brown-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-4 peer-focus-visible:ring-gold-500/25",
                error && "border-destructive",
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>

    <FieldMessage id={id} error={error} hint={hint} />
  </div>
);

export default SegmentedField;
