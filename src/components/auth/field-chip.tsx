import type { LucideIcon } from "lucide-react";

interface FieldChipProps {
  icon: LucideIcon;
  label: string;
}

/** Etiqueta exibida dentro do campo indicando o tipo de dado digitado. */
const FieldChip = ({ icon: Icon, label }: FieldChipProps) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-brown-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-brown-700">
    <Icon className="h-3 w-3" aria-hidden />
    {label}
  </span>
);

export default FieldChip;
