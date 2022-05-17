import { Params } from "../cell/types";

export type Props = {
  data: number[][];
  onChange: (params: Params) => void;
  probe?: ({}) => void;
  minColor: string;
  maxColor: string;
};

export { Panel } from "./Panel";
