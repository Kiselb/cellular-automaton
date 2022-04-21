import React from "react";

import { Props } from "./types";

import "./button.css";

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
        "button",
        status ? "control-active" : "control-inactive",
      ].join(" ")}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};
