import React, { useState } from "react";
import "./cell.css";

export type CellStatus = "dead" | "alive" | "old";

export interface CellParams {
  status: CellStatus;
  row: number;
  col: number;
}

interface CellProps {
  status: CellStatus;
  row: number;
  col: number;
  onClick: (cell: CellParams) => void;
}

export const Cell = ({
  status = "dead",
  row,
  col,
  onClick,
  ...props
}: CellProps) => {
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onClick({
      status,
      row,
      col,
    });
  };
  const onMouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.buttons === 1) {
      onClick({
        status,
        row,
        col,
      });
    }
  };
  return (
    <div
      id={"R" + row + "C" + col}
      className={["cell", `cell--${status}`].join(" ")}
      onClick={onClickHandler}
      onMouseOver={onMouseOverHandler}
      {...props}
    ></div>
  );
};
