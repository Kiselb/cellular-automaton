import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import SignIn from "./SignIn";

import { AuthProvider } from "../../services/auth/Auth";

const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUsedLocation,
}));

it("Control SignIn renders correctly", () => {
  const { asFragment } = render(<SignIn />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Control SignIn has style", () => {
  render(<SignIn />);
  const control = screen.getByTestId("usernameform");
  expect(control).toHaveClass("username");
});
it("Control Submit not fire event", () => {
  const probe = jest.fn();
  const utils = render(<SignIn />);
  const input = utils.getByTestId("username");
  fireEvent.change(input, { target: { value: "" } });
  const control = screen.getByTestId("usernameform");
  fireEvent.submit(control);
  expect(probe).not.toBeCalled();
});
it("Control Submit fire event with context", () => {
  const probe = jest.fn();
  const utils = render(
    <AuthProvider>
      <SignIn probe={probe} />
    </AuthProvider>
  );
  const input = utils.getByTestId("username");
  fireEvent.change(input, { target: { value: "TEST" } });
  const form = screen.getByTestId("usernameform");
  fireEvent.submit(form);
  expect(probe).toBeCalled();
});
it("Control Submit fire event without context", () => {
  const probe = jest.fn();
  const utils = render(<SignIn probe={probe} />);
  const input = utils.getByTestId("username");
  fireEvent.change(input, { target: { value: "TEST" } });
  const form = screen.getByTestId("usernameform");
  fireEvent.submit(form);
  expect(probe).toBeCalled();
});
