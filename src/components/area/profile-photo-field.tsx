import * as React from "react";
import { Camera, Trash2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const INPUT_ID = "profile-photo";

interface ProfilePhotoFieldProps {
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
}

/** Foto de perfil com pré-visualização, usada no perfil de contratante e de profissional. */
const ProfilePhotoField = ({ photoUrl, onPhotoChange }: ProfilePhotoFieldProps) => {
  const [error, setError] = React.useState<string | null>(null);
  const urlRef = React.useRef(photoUrl);

  React.useEffect(() => {
    urlRef.current = photoUrl;
  });

  React.useEffect(
    () => () => {
      if (urlRef.current?.startsWith("blob:")) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const setPhoto = (url: string | null) => {
    if (urlRef.current?.startsWith("blob:")) URL.revokeObjectURL(urlRef.current);
    onPhotoChange(url);
  };

  const handleFile = (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Envie uma imagem JPG, PNG, WEBP ou AVIF.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`A imagem pode ter no máximo ${MAX_SIZE_MB} MB.`);
      return;
    }

    setError(null);
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
      <label
        htmlFor={INPUT_ID}
        className="group relative grid h-24 w-24 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border border-input bg-secondary transition-colors duration-200 ease-out hover:border-gold-500/60"
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Pré-visualização da foto de perfil"
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        ) : (
          <UserRound className="h-9 w-9 text-brown-400" aria-hidden />
        )}

        <span
          aria-hidden
          className={cn(
            "absolute inset-0 grid place-items-center bg-brown-900/45 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100",
            photoUrl ? "" : "opacity-0",
          )}
        >
          <Camera className="h-6 w-6 text-canvas-foreground" />
        </span>
      </label>

      <div className="flex flex-col items-center gap-2 sm:items-start">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button asChild variant="quiet" size="sm" className="h-10 rounded-xl px-4 font-semibold">
            <label htmlFor={INPUT_ID} className="cursor-pointer">
              <Camera className="h-4 w-4" aria-hidden />
              {photoUrl ? "Trocar foto" : "Anexar foto"}
            </label>
          </Button>

          {photoUrl ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setPhoto(null);
              }}
              className="focus-gold inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-destructive hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              Remover foto
            </button>
          ) : null}
        </div>

        {error ? (
          <p role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        ) : (
          <p className="text-xs leading-relaxed text-muted-foreground">
            JPG, PNG, WEBP ou AVIF, até {MAX_SIZE_MB} MB.
          </p>
        )}
      </div>

      <input
        id={INPUT_ID}
        name={INPUT_ID}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          handleFile(event.target.files);
          event.target.value = "";
        }}
      />
    </div>
  );
};

export default ProfilePhotoField;
