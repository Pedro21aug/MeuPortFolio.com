import * as React from "react";

import FieldMessage from "@/components/auth/field-message";
import { fieldLabelClass } from "@/components/auth/field-styles";
import { cn } from "@/lib/utils";

interface FloatingTextareaProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  rows?: number;
  maxLength?: number;
  hint?: React.ReactNode;
  error?: string | null;
  required?: boolean;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
}

/** Área de texto com o mesmo rótulo flutuante dos demais campos. */
const FloatingTextarea = ({
  id,
  label,
  value,
  onValueChange,
  rows = 6,
  maxLength,
  hint,
  error,
  required = false,
  onBlur,
  className,
  placeholder,
}: FloatingTextareaProps) => {
  const [focused, setFocused] = React.useState(false);
  const lifted = focused || value.length > 0;
  const invalid = Boolean(error);

  return (
    <div className={className}>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          rows={rows}
          maxLength={maxLength}
          value={value}
          placeholder={lifted ? placeholder : ""}
          aria-invalid={invalid}
          aria-required={required}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          onChange={(event) => onValueChange(event.target.value)}
          className={cn(
            "w-full resize-y rounded-xl border border-input bg-card px-4 py-4 text-[15px] leading-relaxed text-foreground outline-none transition-all duration-200 ease-out placeholder:text-muted-foreground hover:border-brown-300",
            maxLength && "pb-8",
            focused && !invalid && "border-gold-500 ring-4 ring-gold-500/15",
            invalid && "border-destructive ring-4 ring-destructive/15",
          )}
        />

        <label
          htmlFor={id}
          className={fieldLabelClass({ lifted, focused, invalid, align: "top" })}
        >
          {label}
          {required ? (
            <span aria-hidden className="ml-0.5 text-gold-700">
              *
            </span>
          ) : null}
        </label>

        {maxLength ? (
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2.5 right-4 text-[11px] tabular-nums text-muted-foreground"
          >
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>

      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
};

export default FloatingTextarea;
