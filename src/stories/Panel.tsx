import React from "react";

import "./panel.css";
import { Cell, CellStatus, CellParams } from "./Cell";

export type PanelMode = "display" | "paused";

interface PanelProps {
  data: CellStatus[][];
  mode: PanelMode;
  onChange: (params: CellParams) => void;
}

export const Panel = ({
  data,
  mode: PanelMode = "paused",
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
            className={[
              "grid",
              "grid--cell",
              colindex % row.length === 0 ? "grid--wrap" : "",
            ].join(" ")}
          >
            <Cell
              row={rowindex}
              col={colindex}
              status={item}
              onClick={cellOnClick}
            ></Cell>
          </div>
        ))
      )}
    </div>
  );
};
