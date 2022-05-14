import React, { useEffect } from "react";

import Main from "./main/Main";
import { AuthProvider, RequireAuth } from "../services/auth/Auth";
import { StoreProvider } from "../services/store/StoreProvider";
import { AppStoreMode } from "../domain/types";

const App = () => {
  const [user, setUser] = React.useState("");
  const [mode, setMode] = React.useState<AppStoreMode>("Native");

  // useEffect(() => {
  //   localStorage.setItem("cellular-automaton.user", user);
  // }, [user, mode]);
  useEffect(() => {
    setUser(localStorage.getItem("cellular-automaton.user") || "");
  }, []);
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

  // return (
  //   <StoreProvider mode={mode}>
  //     <Main mode={mode} onModeChange={onModeChange} />
  //   </StoreProvider>
  // );
};

export default App;
