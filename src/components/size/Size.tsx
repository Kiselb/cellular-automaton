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
  const [size, setSize] = useState(defSize);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const currentSize: number = parseInt(event.currentTarget.value);
    if (currentSize < minSize) {
      setSize(minSize);
      onSizeChange(minSize);
    } else {
      if (currentSize > maxSize) {
        setSize(maxSize);
        onSizeChange(maxSize);
      } else {
        onSizeChange(currentSize);
        setSize(currentSize);
      }
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
