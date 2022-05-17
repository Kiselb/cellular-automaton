import React from "react";

import Main from "./main/Main.page";
import { AuthProvider, RequireAuth } from "../services/auth/Auth";
import { StoreProvider } from "../services/store/StoreProvider";
import { AppStoreMode } from "../domain/types";

const App = () => {
  const [mode, setMode] = React.useState<AppStoreMode>("Native");

  const onModeChange = (storeMode: AppStoreMode) => {
    setMode(storeMode as AppStoreMode);
  };
  return (
    <StoreProvider mode={mode}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={mode} onModeChange={onModeChange} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
};

export default App;
