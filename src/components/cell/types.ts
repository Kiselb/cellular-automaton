export type Params = {
  generation: number;
  row: number;
  col: number;
  colorGammaMin?: string;
  colorGammaMax?: string;
  colorEmpty: string;
  colorCell: string;
};

export type Props = Omit<Params, "colorCell"> & {
  onClick: (cell: Params) => void;
  probe?: ({}) => void;
};

export type CalcColor = (
  generation: number,
  colorScaleMin?: string,
  colorScaleMax?: string
) => string;

export { Cell, calcCellColor } from "./Cell";
