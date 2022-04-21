import React, { FC } from "react";

import { Props, VelocitySet } from "./types";

import "./Velocity.css";

export const Velocity: FC<Props> = ({
  onVelocityChange,
  defVelocity,
}: Props) => {
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
