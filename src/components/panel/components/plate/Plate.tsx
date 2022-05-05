import React, { FC } from "react";

import { Props } from "./types";

//import "./plate.css";
import styles from "./plate.module.css";

export const Plate: FC<Props> = ({ children }: Props) => {
  return <div className={styles["panel"]}>{children}</div>;
};
