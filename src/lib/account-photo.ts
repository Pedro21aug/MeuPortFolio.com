import * as React from "react";

export interface AccountPhotoContextValue {
  photoUrl: string | null;
  setPhotoUrl: (url: string | null) => void;
}

/** Foto da conta compartilhada entre o perfil e o cabeçalho. */
export const AccountPhotoContext = React.createContext<AccountPhotoContextValue>({
  photoUrl: null,
  setPhotoUrl: () => undefined,
});

export const useAccountPhoto = () => React.useContext(AccountPhotoContext);
