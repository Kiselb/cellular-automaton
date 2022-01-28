import React, { useEffect, useState } from "react";

import "./container.css";
import { CellParams, CellStatus } from "../cell/Cell";
import { Panel, PanelMode } from "../panel/Panel";

interface ContainerProps {
  rows: number;
  cols: number;
}

export const Container = ({
  rows = 40,
  cols = 40,
  ...props
}: ContainerProps) => {
  const [data, setData] = useState<CellStatus[][]>([]);
  const mode: PanelMode = "paused";
  const onChangeHandler = (params: CellParams) => {
    data[params.row][params.col] = params.status === "dead" ? "alive" : "dead";
    setData([...data]);
  };
  useEffect(() => {
    const blank: CellStatus[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "dead")
    );
    setData(blank);
  }, [rows, cols]);
  return (
    <div className={["container"].join(" ")} {...props}>
      <Panel data={data} mode={mode} onChange={onChangeHandler} {...props} />
    </div>
  );
};
