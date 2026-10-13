import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import FieldMessage from "@/components/auth/field-message";
import { fieldLabelClass } from "@/components/auth/field-styles";
import { cn } from "@/lib/utils";

export interface SelectFieldOption {
  value: string;
  label: string;
  /** Etiqueta curta à esquerda (ex.: a sigla do estado). */
  meta?: string;
  /** Ícone da opção (ex.: os ramos de atividade). */
  icon?: LucideIcon;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectFieldOption[];
  hint?: React.ReactNode;
  error?: string | null;
  className?: string;
  required?: boolean;
  onBlur?: () => void;
  /** Texto da opção vazia exibida no topo da lista. */
  emptyLabel?: string;
}

/** Seleção personalizada (substitui o select nativo) com o visual do design system. */
const SelectField = ({
  id,
  label,
  value,
  onValueChange,
  options,
  hint,
  error,
  className,
  required = false,
  onBlur,
  emptyLabel,
}: SelectFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const invalid = Boolean(error);
  const lifted = open || value.length > 0;
  const selected = options.find((option) => option.value === value);

  return (
    <div className={className}>
      <div className="relative">
        <SelectPrimitive.Root value={value} onValueChange={onValueChange} open={open} onOpenChange={setOpen}>
          <SelectPrimitive.Trigger
            id={id}
            aria-invalid={invalid}
            aria-required={required}
            aria-describedby={hint ? `${id}-hint` : undefined}
            onBlur={onBlur}
            className={cn(
              "group flex h-14 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-input bg-card pl-4 pr-11 text-left text-[15px] text-foreground outline-none transition-all duration-200 ease-out hover:border-brown-300",
              open && !invalid && "border-gold-500 ring-4 ring-gold-500/15",
              invalid && "border-destructive ring-4 ring-destructive/15",
            )}
          >
            <SelectPrimitive.Value placeholder="" asChild>
              <span className="flex min-w-0 items-center gap-2.5">
                {selected ? (
                  <>
                    {selected.meta ? (
                      <span className="inline-flex h-7 min-w-[2.4rem] shrink-0 items-center justify-center rounded-lg bg-brown-100 px-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-brown-700">
                        {selected.meta}
                      </span>
                    ) : null}

                    {selected.icon ? (
                      <span
                        aria-hidden
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary text-brown-600"
                      >
                        <selected.icon className="h-3.5 w-3.5" />
                      </span>
                    ) : null}

                    <span className="truncate">{selected.label}</span>
                  </>
                ) : null}
              </span>
            </SelectPrimitive.Value>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={8}
              className="relative z-50 max-h-80 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-border/80 bg-popover shadow-card data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
              <span aria-hidden className="absolute inset-x-6 top-0 h-px hairline" />

              <SelectPrimitive.Viewport className="max-h-72 p-1.5">
                {emptyLabel ? (
                  <SelectPrimitive.Item
                    value=""
                    className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2.5 text-sm text-muted-foreground outline-none data-[highlighted]:bg-secondary"
                  >
                    <SelectPrimitive.ItemText>{emptyLabel}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ) : null}

                {options.map((option) => {
                  const Icon = option.icon;

                  return (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className="group/item relative flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none transition-colors duration-150 data-[highlighted]:bg-secondary data-[state=checked]:bg-brown-100 data-[state=checked]:font-semibold"
                    >
                      {option.meta ? (
                        <span className="inline-flex h-7 min-w-[2.4rem] shrink-0 items-center justify-center rounded-lg bg-card px-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-brown-700 group-data-[highlighted]/item:bg-brown-100 group-data-[state=checked]/item:bg-card">
                          {option.meta}
                        </span>
                      ) : null}

                      {Icon ? (
                        <span
                          aria-hidden
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary text-brown-600 transition-colors duration-150 group-data-[state=checked]/item:bg-card group-data-[state=checked]/item:text-gold-700"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                      ) : null}

                      <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">
                        {option.label}
                      </SelectPrimitive.ItemText>

                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  );
                })}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        <SelectPrimitive.Icon asChild>
          <ChevronDown
            aria-hidden
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform duration-200 ease-out",
              open ? "rotate-180 text-gold-700" : "text-muted-foreground",
            )}
          />
        </SelectPrimitive.Icon>

        <label htmlFor={id} className={fieldLabelClass({ lifted, focused: open, invalid })}>
          {label}
          {required ? (
            <span aria-hidden className="ml-0.5 text-gold-700">
              *
            </span>
          ) : null}
        </label>
      </div>

      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
};

export default SelectField;
