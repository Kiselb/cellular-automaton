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
    <div className="panel">
      {data.map((row, rowindex) => {
        return (
          <div className="grid--row" key={`Row${rowindex}`}>
            {row.map((item, colindex) => (
              <div
                key={`Wrap:R${rowindex}:C${colindex}`}
                className={["grid", "grid--cell"].join(" ")}
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
            ))}
          </div>
        );
      })}
    </div>
  );
};
