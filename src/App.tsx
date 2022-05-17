import React, { FC } from "react";

// Never use BrowserRouter on GitHub Pages. There are some issues with it, it always shows blank screen. Use HashRouter instead, that will most probably work
import { Routes, Route, HashRouter as Router } from "react-router-dom";

import Main from "./pages/main/Main.page";
import SignIn from "./pages/signin/SignIn.page";

import { AuthProvider, RequireAuth } from "./services/auth/Auth";
import { StoreProvider } from "./services/store/StoreProvider";
import { AppStoreMode } from "./domain/types";

type Props = {
  probe?: ({}) => void;
};
const App: FC<Props> = ({ probe }) => {
  const [mode, setMode] = React.useState<AppStoreMode>("Native");
  const onModeChange = (storeMode: AppStoreMode) => {
    !!probe && probe({});
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
