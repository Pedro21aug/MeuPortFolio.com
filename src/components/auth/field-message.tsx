import { AlertCircle } from "lucide-react";

interface FieldMessageProps {
  id: string;
  error?: string | null;
  hint?: React.ReactNode;
}

/** Mensagem de erro (com role="alert") ou dica abaixo do campo. */
const FieldMessage = ({ id, error, hint }: FieldMessageProps) =>
  error ? (
    <p
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-xs font-medium text-destructive"
    >
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />
      {error}
    </p>
  ) : hint ? (
    <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-muted-foreground">
      {hint}
    </p>
  ) : null;

export default FieldMessage;
