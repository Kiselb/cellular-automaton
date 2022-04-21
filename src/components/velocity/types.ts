export type VelocityItem = {
  delay: number;
  name: string;
};
export type VelocityHandler = (delay: number) => void;
export type Props = {
  onVelocityChange: VelocityHandler;
  defVelocity: number;
  probe?: ({}) => void;
};

export const VelocitySet: VelocityItem[] = [
  { delay: 1000, name: "Медленно" },
  { delay: 2000, name: "Очень медленно" },
  { delay: 100, name: "Быстро" },
  { delay: 10, name: "Очень быстро" },
  { delay: 500, name: "Нормально" },
];

export { Velocity } from "./Velocity";
