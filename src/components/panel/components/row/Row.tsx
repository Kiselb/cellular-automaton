import React, { FC } from "react";

import { Props } from "./types";

//import "./row.css";
import styles from "./row.module.css";

export const Row: FC<Props> = ({ row, children }: Props) => {
  return (
    <div className={styles["grid--row"]} key={`Row${row}`}>
      {children}
    </div>
  );
};
