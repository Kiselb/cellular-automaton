import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Button, ButtonCaption } from "./Button";

it("Cell renders correctly", () => {
  const { asFragment } = render(
    <Button onAction={() => console.log("OK")} caption="Эволюция" status />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Button has style active", () => {
  render(
    <Button onAction={() => console.log("OK")} caption="Эволюция" status />
  );
  const control = screen.getByTestId("actionbutton");
  expect(control).toHaveClass("control-active");
});
it("Button has style inactive", () => {
  render(
    <Button
      onAction={() => console.log("OK")}
      caption="Эволюция"
      status={false}
    />
  );
  const control = screen.getByTestId("actionbutton");
  expect(control).toHaveClass("control-inactive");
});
it("Button has valid caption (content)", () => {
  const caption: ButtonCaption = "Эволюция";
  render(
    <Button
      onAction={() => console.log("OK")}
      caption={caption}
      status={false}
    />
  );
  const control = screen.getByTestId("actionbutton");
  expect(control).toHaveTextContent(caption);
});
it("Button call event handler", () => {
  const probe = jest.fn();
  render(<Button onAction={probe} caption="Эволюция" status />);
  const control = screen.getByTestId("actionbutton");
  fireEvent.click(control);
  expect(probe).toBeCalled();
});
