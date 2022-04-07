import React from "react";

import "./Button.css";

export type ButtonCaption =
  | "Эволюция"
  | "Остановить"
  | "Заполнить"
  | "Сбросить"
  | "Сохранить"
  | "Восстановить";

export type ButtonAction = () => void;
export type ButtonProps = {
  status: boolean;
  caption: ButtonCaption;
  onAction: ButtonAction;
  testId: string;
};
export const Button = ({
  onAction,
  status,
  caption,
  testId,
  ...props
}: ButtonProps) => {
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
