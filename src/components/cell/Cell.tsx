import React from "react";
import chroma from "chroma-js";

import "./cell.css";

export type CellParams = {
  generation: number;
  row: number;
  col: number;
  colorGamma: string;
  colorEmpty: string;
  colorCell: string;
};

type CellProps = Omit<CellParams, "colorCell"> & {
  onClick: (cell: CellParams) => void;
  probe?: ({}) => void;
};

type CalcCellColor = (colorGamma: string, generation: number) => string;

export const calcCellColor1: CalcCellColor = (
  colorGamma: string,
  generation: number
) => chroma(colorGamma).darken(1 + (generation - 1) * 0.1).hex();

export const calcCellColor: CalcCellColor = (
  colorGamma: string,
  generation: number
) => chroma.scale(['yellow', 'darkgreen'])((generation - 1) * 0.1).hex();

export const Cell = ({
  generation,
  row,
  col,
  onClick,
  colorGamma,
  colorEmpty,
  ...props
}: CellProps) => {
  const colorCell: string = calcCellColor(colorGamma, generation);
  const cellParams: CellParams = {
    generation,
    row,
    col,
    colorGamma,
    colorEmpty,
    colorCell,
  };
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onClick(cellParams);
  };
  const onMouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.buttons === 1 && onClick(cellParams);
    event.buttons === 1 && props.probe && props.probe(cellParams);
  };
  const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.probe && props.probe(cellParams);
  };
  return (
    <div
      key={`R${row}:C${col}`}
      data-testid={`R${row}:C${col}`}
      className={["cell"].join(" ")}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
      onMouseOver={onMouseOverHandler}
      style={{ background: generation === 0 ? colorEmpty : colorCell }}
    ></div>
  );
};
