import React, { FC } from "react";

import { EMPTY_CELL_COLOR } from "../../domain/defaults";
import { Cell, Params as CellParams } from "../cell/types";
import { Props } from "./types";
import { Nest } from "./components/nest/types";
import { Row } from "./components/row/types";
import { Plate } from "./components/plate/Plate";

export const Panel: FC<Props> = ({
  data,
  onChange,
  minColor,
  maxColor,
}: Props) => {
  const cellOnClick = (params: CellParams) => {
    onChange(params);
  };
  return (
    <Plate>
      {data.map((row, rowindex) => {
        return (
          <Row row={rowindex} key={`R:${rowindex}`}>
            {row.map((item, colindex) => (
              <Nest
                row={rowindex}
                col={colindex}
                key={`R:${rowindex}C:${colindex}`}
              >
                <Cell
                  data-testid={`R${rowindex}:C${colindex}`}
                  row={rowindex}
                  col={colindex}
                  generation={item}
                  onClick={cellOnClick}
                  colorEmpty={EMPTY_CELL_COLOR}
                  minColor={minColor}
                  maxColor={maxColor}
                ></Cell>
              </Nest>
            ))}
          </Row>
        );
      })}
    </Plate>
  );
};
