import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import App from "./App";

it("App renders correctly", () => {
  const { asFragment } = render(<App />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Set user", () => {
  const probe = jest.fn();
  localStorage.setItem("cellular-automaton.user", "Test");
  render(<App probe={probe} />);
  const control = screen.getByTestId("changeMode");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
