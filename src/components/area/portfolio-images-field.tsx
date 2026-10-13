import * as React from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";

const MAX_IMAGES = 3;
const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

interface SelectedImage {
  id: string;
  file: File;
  url: string;
}

interface PortfolioImagesFieldProps {
  /** Título exibido na área de anexo. */
  title?: string;
  /** Quantidade máxima de imagens aceitas. */
  maxImages?: number;
}

/** Anexos de imagens dos trabalhos do profissional. */
const PortfolioImagesField = ({
  title = "Anexar imagens dos seus trabalhos",
  maxImages = MAX_IMAGES,
}: PortfolioImagesFieldProps) => {
  const generatedId = React.useId();
  const inputId = `portfolio-images-${generatedId}`;
  const [images, setImages] = React.useState<SelectedImage[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const imagesRef = React.useRef(images);

  React.useEffect(() => {
    imagesRef.current = images;
  });

  React.useEffect(
    () => () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url));
    },
    [],
  );

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const incoming = Array.from(fileList);
    const invalidType = incoming.find((file) => !ACCEPTED_TYPES.includes(file.type));
    if (invalidType) {
      setError("Envie apenas imagens JPG, PNG, WEBP ou AVIF.");
      return;
    }

    const tooLarge = incoming.find((file) => file.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooLarge) {
      setError(`Cada imagem pode ter no máximo ${MAX_SIZE_MB} MB.`);
      return;
    }

    const available = maxImages - images.length;
    if (available <= 0) {
      setError(`Você pode anexar até ${maxImages} imagens.`);
      return;
    }

    const accepted = incoming.slice(0, available).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((previous) => [...previous, ...accepted]);
    setError(incoming.length > available ? `Você pode anexar até ${maxImages} imagens.` : null);
  };

  const removeImage = (id: string) => {
    setImages((previous) => {
      const target = previous.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return previous.filter((image) => image.id !== id);
    });
    setError(null);
  };

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={cn(
          "rounded-2xl border border-dashed p-6 text-center transition-colors duration-200 ease-out",
          dragging ? "border-gold-500 bg-brown-100/50" : "border-input bg-secondary/40",
          error && "border-destructive",
        )}
      >
        <label
          htmlFor={inputId}
          className="focus-gold flex cursor-pointer flex-col items-center gap-2 rounded-xl"
        >
          <span
            aria-hidden
            className="grid h-12 w-12 place-items-center rounded-2xl bg-card text-brown-600 shadow-sm"
          >
            <UploadCloud className="h-5 w-5" />
          </span>
          <span className="text-body-s font-semibold text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">
            Arraste os arquivos aqui ou clique para escolher. Até {maxImages} imagens de{" "}
            {MAX_SIZE_MB} MB.
          </span>
        </label>

        <input
          id={inputId}
          name={inputId}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-destructive"
        >
          <ImagePlus className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}

      {images.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image) => (
            <li
              key={image.id}
              className="group relative animate-fade-up overflow-hidden rounded-xl border border-input bg-card"
            >
              <img
                src={image.url}
                alt={image.file.name}
                className="h-24 w-full object-cover"
                crossOrigin="anonymous"
              />
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                aria-label={`Remover ${image.file.name}`}
                className="focus-gold absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-brown-900/70 text-canvas-foreground transition-colors duration-200 hover:bg-brown-900"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
              <span className="block truncate px-2 py-1.5 text-[11px] text-muted-foreground">
                {image.file.name}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default PortfolioImagesField;
