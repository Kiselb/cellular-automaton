import React, { useState, FC } from "react";

import { Props } from "./types";

import styles from "./Size.module.css";

export const Size: FC<Props> = ({
  onSizeChange,
  minSize,
  maxSize,
  defSize,
  testId,
}: Props) => {
  const [size, setSize] = useState<number | "">(defSize);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const parsed = parseInt(event.currentTarget.value);
    const currentSize: number = isNaN(parsed) ? 0 : parsed;

    setSize(isNaN(parsed) ? "" : parsed);
    if (currentSize >= minSize && currentSize <= maxSize) {
      onSizeChange(currentSize);
    }
  };
  return (
    <input
      data-testid={testId}
      className={styles["size"]}
      type="number"
      value={size}
      onChange={onChange}
    ></input>
  );
};
