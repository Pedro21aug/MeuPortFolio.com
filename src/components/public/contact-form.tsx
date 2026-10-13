import * as React from "react";
import { BadgeCheck, Loader2 } from "lucide-react";

import FloatingField from "@/components/auth/auth-floating-field";
import FloatingTextarea from "@/components/auth/auth-floating-textarea";
import { Button } from "@/components/ui/button";
import { isValidEmail } from "@/lib/br-documents";
import { cn } from "@/lib/utils";

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 800;

type FieldName = "name" | "email" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ["name", "email", "message"];

/** Formulário de contato (envio depende do backend). */
const ContactForm = () => {
  const [values, setValues] = React.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent" | "invalid">("idle");

  const validateField = (field: FieldName): string | undefined => {
    switch (field) {
      case "name":
        return values.name.trim().length < 3 ? "Informe seu nome completo." : undefined;
      case "email":
        return isValidEmail(values.email) ? undefined : "Confira o formato do e-mail informado.";
      default:
        return values.message.trim().length < MESSAGE_MIN
          ? `Conte um pouco mais (mínimo ${MESSAGE_MIN} caracteres).`
          : undefined;
    }
  };

  const setField = (field: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
    if (status !== "loading") setStatus("idle");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    FIELD_ORDER.forEach((field) => {
      const message = validateField(field);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);

    if (firstInvalid) {
      setStatus("invalid");
      const element = document.getElementById(`contact-${firstInvalid}`);
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  const loading = status === "loading";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-8">
      <span aria-hidden className="absolute inset-x-8 top-0 h-px hairline" />

      <h2 className="font-display text-headline-s text-foreground">Envie uma mensagem</h2>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <FloatingField
          id="contact-name"
          label="Nome completo"
          required
          value={values.name}
          onValueChange={(value) => setField("name", value)}
          onBlur={() => setErrors((previous) => ({ ...previous, name: validateField("name") }))}
          autoComplete="name"
          error={errors.name}
        />

        <FloatingField
          id="contact-email"
          label="E-mail"
          required
          type="email"
          inputMode="email"
          value={values.email}
          onValueChange={(value) => setField("email", value)}
          onBlur={() => setErrors((previous) => ({ ...previous, email: validateField("email") }))}
          autoComplete="email"
          error={errors.email}
        />

        <FloatingTextarea
          id="contact-message"
          label="Mensagem"
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onValueChange={(value) => setField("message", value)}
          onBlur={() =>
            setErrors((previous) => ({ ...previous, message: validateField("message") }))
          }
          error={errors.message}
        />

        <Button
          type="submit"
          variant="premium"
          size="xl"
          disabled={loading}
          className={cn("group relative w-full overflow-hidden", !loading && "hover:-translate-y-px")}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
          />
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          <span className="relative tracking-[0.01em]">
            {loading ? "Enviando…" : "Enviar mensagem"}
          </span>
        </Button>

        {status === "sent" ? (
          <p
            role="status"
            className="flex items-start gap-2 rounded-xl border border-gold-500/30 bg-brown-100/60 px-3.5 py-3 text-xs leading-relaxed text-brown-700"
          >
            <BadgeCheck className="mt-px h-4 w-4 shrink-0 text-gold-700" aria-hidden />
            Mensagem validada. Ainda falta conectar o backend para enviar o contato por e-mail.
          </p>
        ) : null}
      </form>
    </section>
  );
};

export default ContactForm;
