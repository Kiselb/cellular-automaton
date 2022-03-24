import React, { useEffect } from "react";

import Main from "./Main/Main";
import SignIn from "./signin/SignIn";

const App = () => {
  const [user, setUser] = React.useState(
    () => localStorage.getItem("cellular-automaton.user") || ""
  );
  const cbSignedIn = (user: string) => {
    setUser(user);
  };
  const cbSignedOut = () => {
    setUser("");
  };
  useEffect(() => {
    localStorage.setItem("cellular-automaton.user", user);
  }, [user]);

  return (
    <div className="container">
      {!user ? (
        <SignIn onSignedIn={cbSignedIn} />
      ) : (
        <Main onSignedOut={cbSignedOut} user={user} />
      )}
    </div>
  );
};

export default App;
