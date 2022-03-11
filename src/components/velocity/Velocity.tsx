import React from "react";

import "./Velocity.css";

type VelocityItem = {
  delay: number;
  name: string;
};
export type VelocityHandler = (delay: number) => void;
export type VelocityProps = {
  onVelocityChange: VelocityHandler;
  defVelocity: number;
};

const VelocitySet: VelocityItem[] = [
  { delay: 1000, name: "Медленно" },
  { delay: 2000, name: "Очень медленно" },
  { delay: 250, name: "Быстро" },
  { delay: 100, name: "Очень быстро" },
  { delay: 500, name: "Нормально" },
];

export const Velocity = ({
  onVelocityChange,
  defVelocity,
  ...props
}: VelocityProps) => {
  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    onVelocityChange(parseInt(event.currentTarget.value));
  };
  return (
    <select
      className="velocity"
      data-testid="velocity"
      onChange={onChange}
      defaultValue={defVelocity}
    >
      {VelocitySet.sort((a, b) => {
        if (a.delay < b.delay) return -1;
        if (a.delay > b.delay) return 1;
        return 0;
      }).map((item, index) => {
        return (
          <option key={index} value={item.delay}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};
