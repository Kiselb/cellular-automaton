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
  colorDead: string;
  colorAlive: string;
  colorOld: string;
}

export const Cell = ({
  status = "dead",
  row,
  col,
  onClick,
  colorOld,
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
  const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    alert(`Cell: ${row}x${col}`);
  };
  return (
    <div
      id={`R${row}:C${col}`}
      className={["cell", `cell--${status}`].join(" ")}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
      onMouseOver={onMouseOverHandler}
      style={{ background: colorOld }}
      {...props}
    ></div>
  );
};
