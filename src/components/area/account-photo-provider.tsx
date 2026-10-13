import * as React from "react";

import { AccountPhotoContext } from "@/lib/account-photo";

interface AccountPhotoProviderProps {
  children: React.ReactNode;
}

/** Mantém a foto escolhida no perfil disponível para o cabeçalho da área logada. */
const AccountPhotoProvider = ({ children }: AccountPhotoProviderProps) => {
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);

  const value = React.useMemo(() => ({ photoUrl, setPhotoUrl }), [photoUrl]);

  return <AccountPhotoContext.Provider value={value}>{children}</AccountPhotoContext.Provider>;
};

export default AccountPhotoProvider;
