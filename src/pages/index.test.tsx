import React from "react";

import { AuthProvider, RequireAuth } from "../services/auth/Auth";
import { StoreProvider } from "../services/store/StoreProvider";

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Main from "./main/Main";

it("App renders correctly", () => {
  const { asFragment } = render(
    <StoreProvider mode={"Native"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"Native"} onModeChange={() => console.log("OK")} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  const { asFragment } = render(
    <StoreProvider mode={"ReduxThunk"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"ReduxThunk"} onModeChange={() => console.log("OK")} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  const { asFragment } = render(
    <StoreProvider mode={"ReduxSaga"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"ReduxSaga"} onModeChange={() => console.log("OK")} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  const { asFragment } = render(
    <StoreProvider mode={"ReduxEffects"}>
      <AuthProvider>
        <RequireAuth>
          <Main mode={"ReduxEffects"} onModeChange={() => console.log("OK")} />
        </RequireAuth>
      </AuthProvider>
    </StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
