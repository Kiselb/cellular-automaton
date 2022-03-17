import React, { useState } from "react";

import "./Size.css";

export type SizeHandler = (size: number) => void;

type SizeProps = {
  onSizeChange: SizeHandler;
  minSize: number;
  maxSize: number;
  defSize: number;
};

export const Size = ({
  onSizeChange,
  minSize,
  maxSize,
  defSize,
  ...props
}: SizeProps) => {
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
      data-testid="size"
      className="size"
      type="number"
      value={size}
      onChange={onChange}
    ></input>
  );
};
