import React, { useEffect } from "react";
import { Provider } from "react-redux";

// Never use BrowserRouter on GitHub Pages. There are some issues with it, it always shows blank screen. Use HashRouter instead, that will most probably work
//
import { Routes, Route, HashRouter as Router } from "react-router-dom";

import { Main } from "./main/Main";
import SignIn from "./signin/SignIn";
import store from "./ducks/store";

import { AuthProvider, RequireAuth } from "./Auth";

const App = () => {
  const [user, setUser] = React.useState(
    () => localStorage.getItem("cellular-automaton.user") || ""
  );
  useEffect(() => {
    localStorage.setItem("cellular-automaton.user", user);
  }, [user]);

  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </AuthProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
