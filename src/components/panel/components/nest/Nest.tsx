import React, { FC } from "react";

import { Props } from "./types";

//import "./nest.css";
import styles from "./nest.module.css";

export const Nest: FC<Props> = ({ row, col, children }: Props) => {
  return (
    <div
      key={`Wrap:R${row}:C${col}`}
      className={[styles["grid"], styles["grid--cell"]].join(" ")}
      data-testid="Panel"
    >
      {children}
    </div>
  );
};
