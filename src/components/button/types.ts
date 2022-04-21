import { ButtonCaption } from "../../domain/types";

type ButtonAction = () => void;

export type Props = {
  status: boolean;
  caption: ButtonCaption;
  onAction: ButtonAction;
  testId: string;
  probe?: ({}) => void;
};

export { Button } from "./Button";
