import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { AppStoreMode } from "../../domain/types";
import storeThunk from "../../store/ducks/store";
import storeSaga from "../../store/sagas/index";

type StoreProviderProps = {
  mode: AppStoreMode;
  children: ReactNode;
};
export const StoreProvider = ({ mode, children }: StoreProviderProps) => {
  return mode === "ReduxThunk" || mode === "ReduxSaga" ? (
    mode === "ReduxThunk" ? (
      <Provider store={storeThunk}>{children}</Provider>
    ) : (
      <Provider store={storeSaga}>{children}</Provider>
    )
  ) : (
    <>{children}</>
  );
};
