import React, { useContext, useRef } from "react";
import { useRouter } from "next/router";

import { authContext } from "../../services/auth/Auth";

import styles from "./signIn.module.css";

type TSignInProps = {
  probe?: () => void;
};
const SignIn = ({ probe }: TSignInProps) => {
  const refUserName = useRef<HTMLInputElement>(null);
  const context = useContext(authContext);
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!refUserName && !!refUserName.current && refUserName.current.value) {
      !!probe && probe();
      context?.login(refUserName.current.value);
      router.push("/");
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
