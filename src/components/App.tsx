import React, { useEffect } from "react";

import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";

import { Main } from "./main/Main";
import SignIn from "./signin/SignIn";

import { AuthProvider, RequireAuth, AuthConsumer } from "./Auth";

const App = () => {
  const [user, setUser] = React.useState(
    () => localStorage.getItem("cellular-automaton.user") || ""
  );
  useEffect(() => {
    localStorage.setItem("cellular-automaton.user", user);
  }, [user]);

  return (
    <div className="container">
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
    </div>
  );
};

export default App;
