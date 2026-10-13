import * as React from "react";

import { cn } from "@/lib/utils";

interface CodeInputProps {
  id?: string;
  length?: number;
  value: string;
  onValueChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}

/** Campo de código de N dígitos, com avanço automático, colar e navegação por setas. */
const CodeInput = ({
  id = "code",
  length = 6,
  value,
  onValueChange,
  onComplete,
  disabled = false,
  invalid = false,
}: CodeInputProps) => {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const focusIndex = (index: number) => {
    const target = refs.current[Math.min(Math.max(index, 0), length - 1)];
    target?.focus();
    target?.select();
  };

  const notify = (next: string) => {
    const clean = next.replace(/\D/g, "").slice(0, length);
    onValueChange(clean);
    if (clean.length === length) onComplete?.(clean);
  };

  const handleChange = (index: number, raw: string) => {
    const typed = raw.replace(/\D/g, "");
    if (!typed) return;

    const chars = value.split("");
    let cursor = index;

    for (const char of typed.split("")) {
      if (cursor >= length) break;
      chars[cursor] = char;
      cursor += 1;
    }

    notify(chars.join("").slice(0, length));
    focusIndex(cursor);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const chars = value.split("");

      if (chars[index]) {
        chars.splice(index, 1);
        notify(chars.join(""));
        return;
      }

      if (index > 0) {
        chars.splice(index - 1, 1);
        notify(chars.join(""));
        focusIndex(index - 1);
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusIndex(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    event.preventDefault();

    const chars = value.split("");
    let cursor = index;

    for (const char of pasted.slice(0, length - index).split("")) {
      chars[cursor] = char;
      cursor += 1;
    }

    notify(chars.join("").slice(0, length));
    focusIndex(cursor);
  };

  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-3" role="group" aria-label="Código de verificação">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          id={index === 0 ? id : `${id}-${index}`}
          type="text"
          value={value[index] ?? ""}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          disabled={disabled}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Dígito ${index + 1} de ${length}`}
          aria-invalid={invalid}
          onFocus={(event) => event.target.select()}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          className={cn(
            "h-14 w-full min-w-0 rounded-xl border bg-card text-center font-mono text-xl text-foreground outline-none transition-all duration-200 ease-out",
            invalid
              ? "border-destructive ring-4 ring-destructive/15"
              : "border-input hover:border-brown-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15",
            disabled && "opacity-60",
          )}
        />
      ))}
    </div>
  );
};

export default CodeInput;
