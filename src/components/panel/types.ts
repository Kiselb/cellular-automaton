import { Params } from "../cell/types";

export type Props = {
  data: number[][];
  onChange: (params: Params) => void;
  probe?: ({}) => void;
};

export { Panel } from "./Panel";
