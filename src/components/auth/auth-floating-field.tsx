import * as React from "react";

import FieldMessage from "@/components/auth/field-message";
import { fieldControlClass, fieldLabelClass } from "@/components/auth/field-styles";

interface FloatingFieldProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  hint?: React.ReactNode;
  error?: string | null;
  accessory?: React.ReactNode;
  trailing?: React.ReactNode;
  mono?: boolean;
  maxLength?: number;
  className?: string;
  required?: boolean;
  onBlur?: () => void;
}

const FloatingField = ({
  id,
  label,
  value,
  onValueChange,
  type = "text",
  inputMode,
  autoComplete,
  hint,
  error,
  accessory,
  trailing,
  mono = false,
  maxLength,
  className,
  required = false,
  onBlur,
}: FloatingFieldProps) => {
  const [focused, setFocused] = React.useState(false);
  const lifted = focused || value.length > 0;
  const invalid = Boolean(error);

  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          inputMode={inputMode}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={invalid}
          aria-required={required}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          onChange={(event) => onValueChange(event.target.value)}
          className={fieldControlClass({
            focused,
            invalid,
            className: (trailing || accessory ? "pr-24" : "pr-4") + (mono ? " font-mono tracking-tight" : ""),
          })}
        />

        <label htmlFor={id} className={fieldLabelClass({ lifted, focused, invalid })}>
          {label}
          {required ? (
            <span aria-hidden className="ml-0.5 text-gold-700">
              *
            </span>
          ) : null}
        </label>

        {accessory ? (
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
            {accessory}
          </div>
        ) : null}

        {trailing ? (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">{trailing}</div>
        ) : null}
      </div>

      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
};

export default FloatingField;
