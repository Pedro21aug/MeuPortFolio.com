import * as React from "react";
import { Info, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Campo central de busca do contratante. */
const SearchBar = () => {
  const [term, setTerm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (term.trim().length < 2) {
      setError("Digite o que você procura para começar a buscar.");
      setNotice(false);
      document.getElementById("contractor-search")?.focus({ preventScroll: true });
      return;
    }

    setError(null);
    setNotice(true);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <div className="relative overflow-hidden rounded-3xl border border-canvas-foreground/60 bg-card p-3 shadow-card sm:p-4">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px hairline" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 px-2">
            <Search className="h-5 w-5 shrink-0 text-brown-400" aria-hidden />
            <input
              id="contractor-search"
              name="contractor-search"
              value={term}
              aria-label="Buscar profissionais"
              aria-invalid={Boolean(error)}
              placeholder="Buscar por profissão, serviço ou cidade"
              onChange={(event) => {
                setTerm(event.target.value);
                if (error) setError(null);
                if (notice) setNotice(false);
              }}
              className="h-12 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <Button
            type="submit"
            variant="premium"
            size="xl"
            className="group relative w-full shrink-0 overflow-hidden sm:w-auto"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:animate-shimmer group-hover:opacity-100"
            />
            <span className="relative tracking-[0.01em]">Começar a buscar</span>
          </Button>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-xs font-medium leading-relaxed text-destructive"
        >
          {error}
        </p>
      ) : null}

      {notice ? (
        <p
          role="status"
          className="mt-4 flex items-start gap-2 rounded-xl border border-gold-500/30 bg-brown-100/60 px-3.5 py-3 text-xs leading-relaxed text-brown-700"
        >
          <Info className="mt-px h-4 w-4 shrink-0 text-gold-700" aria-hidden />
          Busca validada. Ainda falta conectar o banco de profissionais para exibir os resultados.
        </p>
      ) : null}
    </form>
  );
};

export default SearchBar;
