import * as React from "react";
import {
  AlertCircle,
  BadgeCheck,
  Brush,
  Camera,
  Car,
  ChevronLeft,
  Clapperboard,
  Code2,
  Droplets,
  Dumbbell,
  GraduationCap,
  Hammer,
  Hand,
  Loader2,
  Palette,
  Paintbrush,
  Plus,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
  Zap,
} from "lucide-react";

import AuthSelectField from "@/components/ui/select-field";
import FloatingField from "@/components/auth/auth-floating-field";
import FloatingTextarea from "@/components/auth/auth-floating-textarea";
import PortfolioActivityFields from "@/components/area/portfolio-activity-fields";
import PortfolioImagesField from "@/components/area/portfolio-images-field";
import { Button } from "@/components/ui/button";
import {
  ACTIVITY_DESCRIPTION_MIN,
  ACTIVITY_SLOT_COUNT,
  activityFieldId,
  createEmptyActivity,
  type ActivityErrorState,
  type PortfolioActivity,
} from "@/lib/portfolio-activity";
import { isValidUrl } from "@/lib/url";
import { cn } from "@/lib/utils";

const SUMMARY_MIN = 40;
const SUMMARY_MAX = 1000;

/** Atividades mais comuns, com opção livre para quem não se encaixa. */
const ACTIVITY_OPTIONS = [
  { value: "desenvolvedor", label: "Desenvolvedor", icon: Code2 },
  { value: "design", label: "Design", icon: Palette },
  { value: "editor", label: "Editor", icon: Clapperboard },
  { value: "fotografo", label: "Fotógrafo", icon: Camera },
  { value: "pintor", label: "Pintor", icon: Paintbrush },
  { value: "pedreiro", label: "Pedreiro", icon: Hammer },
  { value: "cabeleireiro", label: "Cabeleireiro", icon: Scissors },
  { value: "barbeiro", label: "Barbeiro", icon: Brush },
  { value: "manicure", label: "Manicure", icon: Hand },
  { value: "eletricista", label: "Eletricista", icon: Zap },
  { value: "encanador", label: "Encanador", icon: Droplets },
  { value: "marceneiro", label: "Marceneiro", icon: Ruler },
  { value: "costureira", label: "Costureira", icon: Shirt },
  { value: "personal-trainer", label: "Personal trainer", icon: Dumbbell },
  { value: "professor-particular", label: "Professor particular", icon: GraduationCap },
  { value: "motorista", label: "Motorista", icon: Car },
  { value: "outro", label: "Outra atividade", icon: Sparkles },
];

type FormErrors = Partial<Record<"activity" | "summary", string>>;

interface PortfolioFormProps {
  onBack: () => void;
}

/** Cadastro do portfólio do profissional. */
const PortfolioForm = ({ onBack }: PortfolioFormProps) => {
  const [activity, setActivity] = React.useState("");
  const [otherActivity, setOtherActivity] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [activities, setActivities] = React.useState<PortfolioActivity[]>(() =>
    Array.from({ length: ACTIVITY_SLOT_COUNT }, createEmptyActivity),
  );
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [activityErrors, setActivityErrors] = React.useState<ActivityErrorState[]>(() =>
    Array.from({ length: ACTIVITY_SLOT_COUNT }, () => ({})),
  );
  /** Quantidade de atividades liberadas pelo usuário (como o segundo telefone). */
  const [visibleActivities, setVisibleActivities] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "invalid">("idle");

  const validateActivityType = (): string | undefined => {
    if (!activity) return "Selecione a atividade que você exerce.";
    if (activity === "outro" && otherActivity.trim().length < 3) {
      return "Informe qual atividade você exerce.";
    }
    return undefined;
  };

  const validateSummary = (): string | undefined =>
    summary.trim().length < SUMMARY_MIN
      ? `Conte um pouco mais sobre a sua carreira (mínimo ${SUMMARY_MIN} caracteres).`
      : undefined;

  /** Bloco tocado: alguma informação foi digitada, então descrição e duração passam a ser exigidas. */
  const isActivityTouched = (data: PortfolioActivity) =>
    Boolean(
      data.description.trim() || data.duration.trim() || data.links.some((link) => link.trim()),
    );

  const validateActivityDescription = (data: PortfolioActivity): string | undefined => {
    if (!isActivityTouched(data)) return undefined;
    return data.description.trim().length < ACTIVITY_DESCRIPTION_MIN
      ? `Descreva esta atividade (mínimo ${ACTIVITY_DESCRIPTION_MIN} caracteres).`
      : undefined;
  };

  const validateActivityDuration = (data: PortfolioActivity): string | undefined => {
    if (!isActivityTouched(data)) return undefined;
    return data.duration.trim().length >= 2 ? undefined : "Informe a duração. Ex.: 3 dias.";
  };

  const validateActivityLink = (link: string): string | undefined => {
    const trimmed = link.trim();
    if (!trimmed) return undefined;
    return isValidUrl(trimmed) ? undefined : "Informe um link válido. Ex.: https://seu-site.com";
  };

  const validateActivityBlock = (data: PortfolioActivity): ActivityErrorState => ({
    description: validateActivityDescription(data),
    duration: validateActivityDuration(data),
    links: data.links.map(validateActivityLink),
  });

  const handleActivityChange = (index: number, next: PortfolioActivity) => {
    setActivities((previous) => previous.map((item, position) => (position === index ? next : item)));
    setActivityErrors((previous) =>
      previous.map((item, position) => (position === index ? {} : item)),
    );
    if (status !== "loading") setStatus("idle");
  };

  const addActivity = () => {
    setVisibleActivities((count) => Math.min(ACTIVITY_SLOT_COUNT, count + 1));
    if (status !== "loading") setStatus("idle");
  };

  /** Remove a atividade e desloca as seguintes, liberando a última posição. */
  const removeActivity = (index: number) => {
    setActivities((previous) => {
      const remaining = previous.filter((_, position) => position !== index);
      return [...remaining, createEmptyActivity()].slice(0, ACTIVITY_SLOT_COUNT);
    });
    setActivityErrors((previous) => {
      const remaining = previous.filter((_, position) => position !== index);
      return [...remaining, {}].slice(0, ACTIVITY_SLOT_COUNT);
    });
    setVisibleActivities((count) => Math.max(0, count - 1));
    if (status !== "loading") setStatus("idle");
  };

  const handleActivityFieldBlur = (index: number, field: "description" | "duration" | number) => {
    setActivityErrors((previous) =>
      previous.map((current, position) => {
        if (position !== index) return current;

        const data = activities[index];
        const next: ActivityErrorState = { ...current };

        if (field === "description") {
          next.description = validateActivityDescription(data);
        } else if (field === "duration") {
          next.duration = validateActivityDuration(data);
        } else {
          const links = [...(current.links ?? data.links.map(() => undefined))];
          links[field] = validateActivityLink(data.links[field] ?? "");
          next.links = links;
        }

        return next;
      }),
    );
  };

  const findFirstActivityIssue = (blocks: ActivityErrorState[]): string | null => {
    for (let index = 0; index < blocks.length; index += 1) {
      const block = blocks[index];
      if (block.description) return activityFieldId(index, "description");
      if (block.duration) return activityFieldId(index, "duration");

      const linkIndex = block.links?.findIndex(Boolean) ?? -1;
      if (linkIndex >= 0) return activityFieldId(index, `link-${linkIndex}`);
    }

    return null;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {
      activity: validateActivityType(),
      summary: validateSummary(),
    };
    const nextActivityErrors = activities.map((block, index) =>
      index < visibleActivities ? validateActivityBlock(block) : {},
    );

    setErrors(nextErrors);
    setActivityErrors(nextActivityErrors);

    const focusTarget = nextErrors.activity
      ? activity === "outro"
        ? "otherActivity"
        : "activity"
      : nextErrors.summary
        ? "summary"
        : findFirstActivityIssue(nextActivityErrors);

    if (focusTarget) {
      setStatus("invalid");
      const element = document.getElementById(focusTarget);
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 900);
  };

  const loading = status === "loading";

  return (
    <div className="mx-auto w-full max-w-[760px] xl:max-w-[900px] 2xl:max-w-[1040px]">
      <button
        type="button"
        onClick={onBack}
        className="focus-gold mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-body-s font-medium text-canvas-muted transition-colors duration-200 hover:text-gold-300"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Voltar
      </button>

      <div className="animate-fade-up relative w-full">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 animate-pulse-glow rounded-[2.5rem] bg-gold-500/[0.14] blur-3xl"
        />

        <section className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-7 shadow-card sm:p-10">
          <span aria-hidden className="absolute inset-x-10 top-0 h-px animate-hairline-in hairline" />

          <h2 className="font-display text-headline-l text-foreground">Criar portfólio</h2>
          <p className="mt-3 text-body-s text-muted-foreground">
            Conte o que você faz e mostre seus trabalhos.
          </p>

          <form className="mt-8 grid gap-8 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <AuthSelectField
              id="activity"
              label="Atividade"
              required
              value={activity}
              onValueChange={(value) => {
                setActivity(value);
                setErrors((previous) => ({ ...previous, activity: undefined }));
                if (status !== "loading") setStatus("idle");
              }}
              onBlur={() =>
                setErrors((previous) => ({ ...previous, activity: validateActivityType() }))
              }
              options={ACTIVITY_OPTIONS}
              error={errors.activity}
              hint="Escolha a atividade que melhor representa o seu trabalho."
              className="sm:col-span-2"
            />

            {activity === "outro" ? (
              <FloatingField
                id="otherActivity"
                label="Qual atividade?"
                required
                value={otherActivity}
                onValueChange={(value) => {
                  setOtherActivity(value);
                  setErrors((previous) => ({ ...previous, activity: undefined }));
                }}
                onBlur={() =>
                  setErrors((previous) => ({ ...previous, activity: validateActivityType() }))
                }
                error={errors.activity}
                className="animate-fade-up sm:col-span-2"
              />
            ) : null}

            <FloatingTextarea
              id="summary"
              label="Resumo da sua carreira"
              required
              rows={7}
              maxLength={SUMMARY_MAX}
              value={summary}
              onValueChange={(value) => {
                setSummary(value);
                setErrors((previous) => ({ ...previous, summary: undefined }));
                if (status !== "loading") setStatus("idle");
              }}
              onBlur={() =>
                setErrors((previous) => ({ ...previous, summary: validateSummary() }))
              }
              error={errors.summary}
              hint="Fale da sua experiência, tipos de trabalho, especialidades e diferenciais."
              placeholder="Ex.: 8 anos trabalhando com reformas residenciais, especialista em acabamento..."
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-headline-s text-foreground">
                  Atividades que você realiza
                </h3>
                <p className="text-body-s text-muted-foreground">
                  Cada atividade tem imagens, links, descrição e duração. São opcionais — clique
                  para liberar o cadastro de até {ACTIVITY_SLOT_COUNT} atividades.
                </p>
              </div>

              {visibleActivities > 0 ? (
                <div className="mt-5 space-y-5">
                  {activities.slice(0, visibleActivities).map((block, index) => (
                    <PortfolioActivityFields
                      key={index}
                      index={index}
                      value={block}
                      errors={activityErrors[index] ?? {}}
                      onChange={(next) => handleActivityChange(index, next)}
                      onFieldBlur={(field) => handleActivityFieldBlur(index, field)}
                      onRemove={() => removeActivity(index)}
                    />
                  ))}
                </div>
              ) : null}

              {visibleActivities < ACTIVITY_SLOT_COUNT ? (
                <button
                  type="button"
                  onClick={addActivity}
                  className="focus-gold mt-5 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-gold-700 underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  {visibleActivities === 0 ? "Adicionar atividade" : "Adicionar outra atividade"}
                </button>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <PortfolioImagesField />
            </div>

            {status === "invalid" ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-xs font-medium leading-relaxed text-destructive sm:col-span-2"
              >
                <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden />
                Não foi possível publicar: revise os campos destacados abaixo.
              </p>
            ) : null}

            <Button
              type="submit"
              variant="premium"
              size="xl"
              disabled={loading}
              className={cn(
                "group relative overflow-hidden sm:col-span-2",
                !loading && "hover:-translate-y-px",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
              />
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              <span className="relative tracking-[0.01em]">
                {loading ? "Publicando…" : "Criar portfólio"}
              </span>
            </Button>

            {status === "done" ? (
              <p
                role="status"
                className="flex items-start gap-2 rounded-xl border border-gold-500/30 bg-brown-100/60 px-3.5 py-3 text-xs leading-relaxed text-brown-700 sm:col-span-2"
              >
                <BadgeCheck className="mt-px h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                Portfólio validado. Ainda falta conectar o backend para publicar e armazenar as
                imagens.
              </p>
            ) : (
              <p className="text-center text-xs leading-relaxed text-muted-foreground sm:col-span-2">
                Depois de publicar, seu portfólio fica visível para os contratantes
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default PortfolioForm;
