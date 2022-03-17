import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Velocity } from "./Velocity";

it("Control Velocity renders correctly", () => {
  const { asFragment } = render(
    <Velocity onVelocityChange={() => alert("OK")} defVelocity={100} />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Control Velocity has style", () => {
  render(<Velocity onVelocityChange={() => alert("OK")} defVelocity={100} />);
  const control = screen.getByTestId("velocity");
  expect(control).toHaveClass("velocity");
});
it("Control Velocity fire event", () => {
  const probe = jest.fn();
  render(<Velocity onVelocityChange={probe} defVelocity={100} />);
  const control = screen.getByTestId("velocity");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
