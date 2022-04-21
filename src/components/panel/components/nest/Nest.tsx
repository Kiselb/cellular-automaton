import React, { FC } from "react";

import { Props } from "./types";

import "./nest.css";

export const Nest: FC<Props> = ({ row, col, children }: Props) => {
  return (
    <div
      key={`Wrap:R${row}:C${col}`}
      className={["grid", "grid--cell"].join(" ")}
      data-testid="Panel"
    >
      {children}
    </div>
  );
};
