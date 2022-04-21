import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Size } from "./types";

it("Control Size renders correctly", () => {
  const { asFragment } = render(
    <Size
      minSize={10}
      maxSize={50}
      onSizeChange={() => alert("OK")}
      defSize={50}
      testId="size"
    />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Control Size has style", () => {
  render(
    <Size
      minSize={10}
      maxSize={50}
      onSizeChange={() => alert("OK")}
      defSize={50}
      testId="size"
    />
  );
  const control = screen.getByTestId("size");
  expect(control).toHaveClass("size");
});
it("Control Size call event handler", () => {
  const probe = jest.fn();
  render(
    <Size
      minSize={10}
      maxSize={50}
      onSizeChange={probe}
      defSize={50}
      testId="size"
    />
  );
  const control = screen.getByTestId("size");
  fireEvent.change(control, { target: { value: 11 } });
  expect(probe).toBeCalled();
});
it("Control Size check min boundary", () => {
  const minSize = 10;
  const probe = (size: number) => {
    expect(size).toEqual(minSize);
  };
  render(
    <Size
      minSize={minSize}
      maxSize={50}
      onSizeChange={probe}
      defSize={50}
      testId="size"
    />
  );
  const control = screen.getByTestId("size");
  fireEvent.change(control, { target: { value: minSize - 1 } });
});
it("Control Size check max boundary", () => {
  const maxSize = 50;
  const probe = (size: number) => {
    expect(size).toEqual(maxSize);
  };
  render(
    <Size
      minSize={10}
      maxSize={maxSize}
      onSizeChange={probe}
      defSize={50}
      testId="size"
    />
  );
  const control = screen.getByTestId("size");
  fireEvent.change(control, { target: { value: maxSize + 1 } });
});
