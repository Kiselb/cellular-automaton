import React from "react";

import { Cell, CellStatus, CellParams } from "../cell/Cell";

export type PanelMode = "display" | "paused";

interface PanelProps {
  data: CellStatus[][];
  mode: PanelMode;
  onChange: (params: CellParams) => void;
}

export const Panel = ({
  data,
  mode: PanelMode,
  onChange,
  ...props
}: PanelProps) => {
  const cellOnClick = (params: CellParams) => {
    onChange(params);
  };
  return (
    <div className={["panel"].join(" ")} {...props}>
      {data.map((row, rowindex) =>
        row.map((item, colindex) => (
          <div
            key={`Wrap:R${rowindex}:C${colindex}`}
            className={[
              "grid",
              "grid--cell",
              colindex % row.length === 0 ? "grid--wrap" : "",
            ].join(" ")}
            data-testid="Panel"
          >
            <Cell
              data-testid={`R${rowindex}:C${colindex}`}
              row={rowindex}
              col={colindex}
              status={item}
              onClick={cellOnClick}
              colorAlive="green"
              colorDead="#ececec"
              colorOld="lightgreen"
            ></Cell>
          </div>
        ))
      )}
    </div>
  );
};
