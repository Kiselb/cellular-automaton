import React, { useRef } from "react";

import "./SignIn.css";

export type TSignInProps = {
  onSignedIn: (user: string) => void;
};
const SignIn = ({ onSignedIn }: TSignInProps) => {
  const refUserName = useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !!refUserName.current &&
      !!refUserName.current.value &&
      onSignedIn(refUserName.current.value);
  };
  return (
    <form data-testid="usernameform" className="username" onSubmit={onSubmit}>
      <input
        data-testid="username"
        ref={refUserName}
        type="text"
        placeholder="Введите Ваше имя"
      />
      <input data-testid="usernamesubmit" type="submit" value="Войти" />
    </form>
  );
};
export default SignIn;
