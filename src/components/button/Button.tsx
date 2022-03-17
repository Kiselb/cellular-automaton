import React from "react";

import "./Button.css";

export type ButtonCaption =
  | "Эволюция"
  | "Остановить"
  | "Заполнить"
  | "Сбросить";
export type ButtonAction = () => void;
export type ButtonProps = {
  status: boolean;
  caption: ButtonCaption;
  onAction: ButtonAction;
};
export const Button = ({
  onAction,
  status,
  caption,
  ...props
}: ButtonProps) => {
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAction();
  };
  return (
    <button
      data-testid="actionbutton"
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
