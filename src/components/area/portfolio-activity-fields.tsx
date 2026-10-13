import { Plus, Trash2 } from "lucide-react";

import FloatingField from "@/components/auth/auth-floating-field";
import FloatingTextarea from "@/components/auth/auth-floating-textarea";
import PortfolioImagesField from "@/components/area/portfolio-images-field";
import {
  MAX_ACTIVITY_LINKS,
  activityFieldId,
  type ActivityErrorState,
  type PortfolioActivity,
} from "@/lib/portfolio-activity";

interface PortfolioActivityFieldsProps {
  index: number;
  value: PortfolioActivity;
  errors: ActivityErrorState;
  onChange: (next: PortfolioActivity) => void;
  onFieldBlur: (field: "description" | "duration" | number) => void;
  onRemove: () => void;
}

/** Bloco de uma atividade do portfólio: descrição, duração, links e imagens. */
const PortfolioActivityFields = ({
  index,
  value,
  errors,
  onChange,
  onFieldBlur,
  onRemove,
}: PortfolioActivityFieldsProps) => {
  const number = index + 1;

  const setLink = (position: number, url: string) => {
    const links = [...value.links];
    links[position] = url;
    onChange({ ...value, links });
  };

  const addLink = () => onChange({ ...value, links: [...value.links, ""] });

  const removeLink = (position: number) =>
    onChange({ ...value, links: value.links.filter((_, current) => current !== position) });

  return (
    <div className="animate-fade-up rounded-2xl border border-input bg-secondary/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-headline-s text-foreground">Atividade {number}</h3>

        <button
          type="button"
          onClick={onRemove}
          className="focus-gold inline-flex items-center gap-1.5 rounded text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-destructive hover:underline"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Remover atividade
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <FloatingTextarea
          id={activityFieldId(index, "description")}
          label="Descrição da atividade"
          rows={4}
          maxLength={400}
          value={value.description}
          onValueChange={(description) => onChange({ ...value, description })}
          onBlur={() => onFieldBlur("description")}
          error={errors.description}
          className="sm:col-span-2"
        />

        <FloatingField
          id={activityFieldId(index, "duration")}
          label="Duração"
          value={value.duration}
          onValueChange={(duration) => onChange({ ...value, duration })}
          onBlur={() => onFieldBlur("duration")}
          hint="Ex.: 2 horas, 3 dias, 1 semana"
          error={errors.duration}
        />

        <FloatingField
          id={activityFieldId(index, "link-0")}
          label="Link"
          inputMode="url"
          autoComplete="off"
          value={value.links[0] ?? ""}
          onValueChange={(url) => setLink(0, url)}
          onBlur={() => onFieldBlur(0)}
          hint="Ex.: https://seu-site.com"
          error={errors.links?.[0]}
        />
      </div>

      {value.links.slice(1).map((link, position) => {
        const linkIndex = position + 1;

        return (
          <div key={linkIndex} className="mt-4 flex items-end gap-3">
            <FloatingField
              id={activityFieldId(index, `link-${linkIndex}`)}
              label={`Link ${linkIndex + 1}`}
              inputMode="url"
              autoComplete="off"
              value={link}
              onValueChange={(url) => setLink(linkIndex, url)}
              onBlur={() => onFieldBlur(linkIndex)}
              error={errors.links?.[linkIndex]}
              className="flex-1"
            />

            <button
              type="button"
              onClick={() => removeLink(linkIndex)}
              aria-label={`Remover link ${linkIndex + 1}`}
              className="focus-gold mb-3 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-input bg-card text-muted-foreground transition-colors duration-200 hover:border-destructive/40 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        );
      })}

      {value.links.length < MAX_ACTIVITY_LINKS ? (
        <button
          type="button"
          onClick={addLink}
          className="focus-gold mt-4 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-gold-700 underline-offset-4 transition-colors duration-200 hover:underline"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          Adicionar link
        </button>
      ) : null}

      <div className="mt-5">
        <PortfolioImagesField title="Imagens desta atividade" />
      </div>
    </div>
  );
};

export default PortfolioActivityFields;
