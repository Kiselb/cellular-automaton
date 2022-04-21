export type SizeHandler = (size: number) => void;

export type Props = {
  onSizeChange: SizeHandler;
  minSize: number;
  maxSize: number;
  defSize: number;
  testId: string;
  probe?: ({}) => void;
};

export { Size } from "./Size";
