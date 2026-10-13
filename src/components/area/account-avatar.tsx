import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import { useAccountPhoto } from "@/lib/account-photo";

interface AccountAvatarProps {
  /** Rota do perfil da área logada. */
  href: string;
}

/** Avatar do cabeçalho: mostra a foto escolhida ou o ícone padrão. */
const AccountAvatar = ({ href }: AccountAvatarProps) => {
  const { photoUrl } = useAccountPhoto();

  return (
    <Link
      to={href}
      aria-label="Abrir o perfil"
      className="focus-gold group relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-canvas-foreground/20 bg-canvas-foreground/[0.06] transition-all duration-200 ease-out hover:border-gold-400/60 hover:bg-canvas-foreground/[0.12]"
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Foto do perfil"
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      ) : (
        <UserRound
          className="h-5 w-5 text-canvas-foreground/75 transition-colors duration-200 group-hover:text-gold-300"
          aria-hidden
        />
      )}
    </Link>
  );
};

export default AccountAvatar;
