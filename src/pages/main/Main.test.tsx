import React from "react";
import { Provider } from "react-redux";

import { AuthProvider, RequireAuth } from "../../services/auth/Auth";
import { StoreProvider } from "../../services/store/StoreProvider";

import store from "../../store/ducks/store";

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Main from "./Main.page";

it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"Native"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"Native"} onModeChange={() => null} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxThunk"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"ReduxThunk"} onModeChange={() => null} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxSaga"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"ReduxSaga"} onModeChange={() => null} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxEffects"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"ReduxEffects"} onModeChange={() => null} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Main Native selected correctly", () => {
  expect(<Main mode="Native" onModeChange={() => null} />).not.toBe(null);
});
it("Main ReduxThunk selected correctly", () => {
  expect(<Main mode="ReduxThunk" onModeChange={() => null} />).not.toBe(null);
});
it("Main ReduxSaga selected correctly", () => {
  expect(<Main mode="ReduxSaga" onModeChange={() => null} />).not.toBe(null);
});
it("Main ReduxEffects selected correctly", () => {
  expect(<Main mode="ReduxEffects" onModeChange={() => null} />).not.toBe(null);
});
it("Main Native change mode", () => {
  const probe = jest.fn();
  render(<Main mode="Native" onModeChange={() => null} probe={probe} />);
  const control = screen.getByTestId("changeMode");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
it("Main ReduxEffects change mode", () => {
  const probe = jest.fn();
  render(
    <Provider store={store}>
      <AuthProvider>
        <Main mode="ReduxEffects" probe={probe} onModeChange={() => null} />
      </AuthProvider>
    </Provider>
  );
  const control = screen.getByTestId("changeMode");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
it("Main ReduxThunk change mode", () => {
  const probe = jest.fn();
  render(
    <Provider store={store}>
      <AuthProvider>
        <Main mode="ReduxThunk" probe={probe} onModeChange={() => null} />
      </AuthProvider>
    </Provider>
  );
  const control = screen.getByTestId("changeMode");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
it("Main ReduxSaga change mode", () => {
  const probe = jest.fn();
  render(
    <Provider store={store}>
      <AuthProvider>
        <Main mode="ReduxSaga" probe={probe} onModeChange={() => null} />
      </AuthProvider>
    </Provider>
  );
  const control = screen.getByTestId("changeMode");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
