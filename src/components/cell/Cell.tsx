import React, { FC } from "react";
import chroma from "chroma-js";

import { Params, Props, CalcColor } from "./types";

//import "./cell.css";
import styles from "./cell.module.css";

export const calcCellColor: CalcColor = (
  generation: number,
  colorScaleMin = "yellow",
  colorScaleMax = "darkgreen"
) =>
  chroma
    .scale([colorScaleMin, colorScaleMax])((generation - 1) * 0.1)
    .hex();

export const Cell: FC<Props> = ({
  generation,
  row,
  col,
  onClick,
  colorEmpty,
  probe,
}: Props) => {
  const colorCell: string = calcCellColor(generation);
  const cellParams: Params = {
    generation,
    row,
    col,
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
    event.buttons === 1 && probe && probe(cellParams);
  };
  const onDoubleClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    probe && probe(cellParams);
  };
  return (
    <div
      key={`R${row}:C${col}`}
      data-testid={`R${row}:C${col}`}
      className={styles["cell"]}
      onClick={onClickHandler}
      onDoubleClick={onDoubleClickHandler}
      onMouseOver={onMouseOverHandler}
      style={{ background: generation === 0 ? colorEmpty : colorCell }}
    ></div>
  );
};
