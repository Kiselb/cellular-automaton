import React from "react";

import { Props } from "./types";

import styles from "./Button.module.css";

export const Button: React.FC<Props> = ({
  onAction,
  status,
  caption,
  testId,
}: Props) => {
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAction();
  };
  return (
    <button
      data-testid={testId}
      className={[
        styles["button"],
        status ? styles["control-active"] : styles["control-inactive"],
      ].join(" ")}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};
