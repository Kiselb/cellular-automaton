import React from "react";
import "./panel.css";
import { Cell, CellParams } from "../cell/Cell";

interface PanelProps {
  data: number[][];
  onChange: (params: CellParams) => void;
}

export const Panel = ({ data, onChange, ...props }: PanelProps) => {
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
              generation={item}
              onClick={cellOnClick}
              colorEmpty="#ececec"
              colorGamma="#77FF77"
            ></Cell>
          </div>
        ))
      )}
    </div>
  );
};
