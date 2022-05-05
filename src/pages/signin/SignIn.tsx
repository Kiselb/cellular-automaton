import React, { useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { authContext } from "../../services/auth/Auth";

//import "./signIn.css";
import styles from "./signIn.module.css";

interface ILocationState {
  from: {
    pathname: string;
  };
}
type TSignInProps = {
  probe?: () => void;
};
const SignIn = ({ probe }: TSignInProps) => {
  const refUserName = useRef<HTMLInputElement>(null);
  const context = useContext(authContext);
  const navigate = useNavigate();
  const state: ILocationState = useLocation().state as ILocationState;
  const from = !!state ? state.from?.pathname : "/";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!refUserName && !!refUserName.current && refUserName.current.value) {
      !!probe && probe();
      context?.login(refUserName.current.value);
      navigate(from, { replace: true });
    }
  };
  return (
    <form
      data-testid="usernameform"
      className={styles["username"]}
      onSubmit={onSubmit}
    >
      <input
        className={styles["input"]}
        data-testid="username"
        ref={refUserName}
        type="text"
        placeholder="Введите Ваше имя"
      />
      <input
        className={styles["input"]}
        data-testid="usernamesubmit"
        type="submit"
        value="Старт"
      />
    </form>
  );
};
export default SignIn;
