import React, { useEffect } from "react";

// Never use BrowserRouter on GitHub Pages. There are some issues with it, it always shows blank screen. Use HashRouter instead, that will most probably work
import { Routes, Route, HashRouter as Router } from "react-router-dom";

import Main from "./pages/main/Main";
import SignIn from "./pages/signin/SignIn";

import { AuthProvider, RequireAuth } from "./services/auth/Auth";
import { StoreProvider } from "./services/store/StoreProvider";
import { AppStoreMode } from "./domain/types";

const App = () => {
  const [user] = React.useState(
    () => localStorage.getItem("cellular-automaton.user") || ""
  );
  const [mode, setMode] = React.useState<AppStoreMode>("Native");

  useEffect(() => {
    localStorage.setItem("cellular-automaton.user", user);
  }, [user, mode]);
  const onModeChange = (storeMode: AppStoreMode) => {
    setMode(storeMode as AppStoreMode);
  };

  return (
    <StoreProvider mode={mode}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Main mode={mode} onModeChange={onModeChange} />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </Router>
    </StoreProvider>
  );
};

export default App;