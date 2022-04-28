import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { AppStoreMode } from "../../domain/types";
import storeThunk from "../../store/ducks/store";
import storeSaga from "../../store/sagas/index";
import storeEffects from "../../store/effects/index";

type StoreProviderProps = {
  mode: AppStoreMode;
  children: ReactNode;
};
export const StoreProvider = ({ mode, children }: StoreProviderProps) => {
  switch (mode) {
    case "Native":
      return <>{children}</>;
    case "ReduxThunk":
      return <Provider store={storeThunk}>{children}</Provider>;
    case "ReduxSaga":
      return <Provider store={storeSaga}>{children}</Provider>;
    case "ReduxEffects":
      return <Provider store={storeEffects}>{children}</Provider>;
    default:
      return <>{children}</>;
  }
};
