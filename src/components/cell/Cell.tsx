import React from "react";

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
  probe?: (params: any) => void;
}

export const Cell = ({
  status,
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
    console.log(`Buttons: ${event.buttons}`);
    event.buttons === 1 && onClick({ status, row, col });
    event.buttons === 1 && props.probe && props.probe({ status, row, col });
  };
  const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(`Cell: ${row}x${col}`);
    props.probe && props.probe({ status, row, col });
  };
  return (
    <div
      key={`R${row}:C${col}`}
      data-testid={`R${row}:C${col}`}
      className={["cell", `cell--${status}`].join(" ")}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
      onMouseOver={onMouseOverHandler}
      style={{ background: colorOld }}
    ></div>
  );
};
