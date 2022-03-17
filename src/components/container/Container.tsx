import React, { useEffect, useState } from "react";
import "./container.css";
import { CellParams } from "../cell/Cell";
import { Panel } from "../panel/Panel";

interface ContainerProps {
  rows: number;
  cols: number;
  probe?: ({}) => void;
}

export const Container = ({ rows, cols, probe, ...props }: ContainerProps) => {
  const [data, setData] = useState<number[][]>([]);
  const onChangeHandler = (params: CellParams) => {
    data[params.row][params.col] = params.generation = 0;
    setData([...data]);
    probe && probe({ rows, cols });
  };
  useEffect(() => {
    const blank: number[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    setData(blank);
  }, [rows, cols]);
  return (
    <div className={["container"].join(" ")} {...props}>
      <Panel data={data} onChange={onChangeHandler} {...props} />
    </div>
  );
};
