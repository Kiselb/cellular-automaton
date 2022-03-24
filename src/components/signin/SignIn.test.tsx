import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import SignIn from "./SignIn";

it("Control SignIn renders correctly", () => {
  const { asFragment } = render(<SignIn onSignedIn={() => alert("OK")} />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Control SignIn has style", () => {
  render(<SignIn onSignedIn={() => alert("OK")} />);
  const control = screen.getByTestId("usernameform");
  expect(control).toHaveClass("username");
});
it("Control Velocity not fire event", () => {
  const probe = jest.fn();
  const utils = render(<SignIn onSignedIn={probe} />);
  const input = utils.getByTestId("username");
  fireEvent.change(input, { target: { value: "" } });
  const control = screen.getByTestId("usernameform");
  fireEvent.submit(control);
  expect(probe).not.toBeCalled();
});
it("Control Velocity not fire event", () => {
  const probe = jest.fn();
  const utils = render(<SignIn onSignedIn={probe} />);
  const input = utils.getByTestId("username");
  fireEvent.change(input, { target: { value: "TEST" } });
  const control = screen.getByTestId("usernameform");
  fireEvent.submit(control);
  expect(probe).toBeCalled();
});
