import { cn } from "@/lib/utils";

/** Classes do rótulo flutuante, compartilhadas por inputs, selects e textareas. */
export const fieldLabelClass = ({
  lifted,
  focused,
  invalid,
  align = "center",
}: {
  lifted: boolean;
  focused: boolean;
  invalid: boolean;
  /** "top" mantém o rótulo no alto (usado em áreas de texto). */
  align?: "center" | "top";
}) =>
  cn(
    "pointer-events-none absolute left-3.5 origin-left select-none font-medium transition-all duration-200 ease-out",
    lifted
      ? "top-0 -translate-y-1/2 bg-card px-1.5 text-[10px] font-semibold uppercase tracking-eyebrow"
      : align === "top"
        ? "top-4 px-1 text-[15px]"
        : "top-1/2 -translate-y-1/2 px-1 text-[15px]",
    invalid ? "text-destructive" : focused ? "text-gold-700" : "text-muted-foreground",
  );

/** Classes do controle (input/select) do campo. O texto fica sempre centralizado. */
export const fieldControlClass = ({
  focused,
  invalid,
  className,
}: {
  focused: boolean;
  invalid: boolean;
  className?: string;
}) =>
  cn(
    "h-14 w-full rounded-xl border border-input bg-card pl-4 text-[15px] text-foreground outline-none transition-all duration-200 ease-out hover:border-brown-300",
    focused && !invalid && "border-gold-500 ring-4 ring-gold-500/15",
    invalid && "border-destructive ring-4 ring-destructive/15",
    className,
  );
