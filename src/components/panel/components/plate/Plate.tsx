import React, { FC } from "react";

import { Props } from "./types";

import "./plate.css";

export const Plate: FC<Props> = ({ children }: Props) => {
  return <div className="panel">{children}</div>;
};
