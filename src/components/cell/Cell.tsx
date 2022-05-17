import React, { FC } from "react";
import chroma from "chroma-js";

import { DEF_MIN_COLOR, DEF_MAX_COLOR } from "../../domain/defaults";
import { Params, Props, CalcColor } from "./types";

import styles from "./cell.module.css";

export const calcCellColor: CalcColor = (
  generation: number,
  colorScaleMin = DEF_MIN_COLOR,
  colorScaleMax = DEF_MAX_COLOR
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
  minColor,
  maxColor,
}: Props) => {
  const colorCell: string = calcCellColor(generation, minColor, maxColor);
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
