import * as React from "react";

import FieldMessage from "@/components/auth/field-message";
import type { BirthDate } from "@/lib/birth-date";
import { cn } from "@/lib/utils";

interface BirthDateFieldProps {
  value: BirthDate;
  onValueChange: (value: BirthDate) => void;
  error?: string | null;
  hint?: React.ReactNode;
  required?: boolean;
  onBlur?: () => void;
  className?: string;
  idPrefix?: string;
}

/** Data de nascimento em três campos: dia, mês e ano. */
const BirthDateField = ({
  value,
  onValueChange,
  error,
  hint,
  required = false,
  onBlur,
  className,
  idPrefix = "birth",
}: BirthDateFieldProps) => {
  const invalid = Boolean(error);

  const inputClass = cn(
    "h-14 rounded-xl border bg-card text-center font-mono text-[15px] text-foreground outline-none transition-all duration-200 ease-out placeholder:font-sans placeholder:text-muted-foreground hover:border-brown-300",
    invalid
      ? "border-destructive ring-4 ring-destructive/15"
      : "border-input focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15",
  );

  const handleChange = (
    field: keyof BirthDate,
    raw: string,
    maxLength: number,
    nextId?: string,
  ) => {
    const digits = raw.replace(/\D/g, "").slice(0, maxLength);
    onValueChange({ ...value, [field]: digits });

    if (digits.length === maxLength && nextId) {
      document.getElementById(nextId)?.focus();
    }
  };

  const handleKeyDown = (
    field: keyof BirthDate,
    event: React.KeyboardEvent<HTMLInputElement>,
    previousId?: string,
  ) => {
    if (event.key === "Backspace" && !value[field] && previousId) {
      document.getElementById(previousId)?.focus();
    }
  };

  return (
    <div className={className}>
      <fieldset className="min-w-0">
        <legend className="text-body-s font-medium text-foreground">
          Data de nascimento
          {required ? (
            <span aria-hidden className="ml-0.5 text-gold-700">
              *
            </span>
          ) : null}
        </legend>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            id={`${idPrefix}-day`}
            name={`${idPrefix}-day`}
            value={value.day}
            inputMode="numeric"
            maxLength={2}
            placeholder="DD"
            aria-label="Dia"
            aria-invalid={invalid}
            onBlur={onBlur}
            onChange={(event) => handleChange("day", event.target.value, 2, `${idPrefix}-month`)}
            onKeyDown={(event) => handleKeyDown("day", event)}
            className={cn(inputClass, "w-20")}
          />

          <span aria-hidden className="text-muted-foreground">
            /
          </span>

          <input
            id={`${idPrefix}-month`}
            name={`${idPrefix}-month`}
            value={value.month}
            inputMode="numeric"
            maxLength={2}
            placeholder="MM"
            aria-label="Mês"
            aria-invalid={invalid}
            onBlur={onBlur}
            onChange={(event) => handleChange("month", event.target.value, 2, `${idPrefix}-year`)}
            onKeyDown={(event) => handleKeyDown("month", event, `${idPrefix}-day`)}
            className={cn(inputClass, "w-20")}
          />

          <span aria-hidden className="text-muted-foreground">
            /
          </span>

          <input
            id={`${idPrefix}-year`}
            name={`${idPrefix}-year`}
            value={value.year}
            inputMode="numeric"
            maxLength={4}
            placeholder="AAAA"
            aria-label="Ano"
            aria-invalid={invalid}
            onBlur={onBlur}
            onChange={(event) => handleChange("year", event.target.value, 4)}
            onKeyDown={(event) => handleKeyDown("year", event, `${idPrefix}-month`)}
            className={cn(inputClass, "w-28")}
          />
        </div>
      </fieldset>

      <FieldMessage id={idPrefix} error={error} hint={hint} />
    </div>
  );
};

export default BirthDateField;
