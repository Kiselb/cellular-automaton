import React, { FC } from "react";

import { Props } from "./types";

import "./row.css";

export const Row: FC<Props> = ({ row, children }: Props) => {
  return (
    <div className="grid--row" key={`Row${row}`}>
      {children}
    </div>
  );
};
