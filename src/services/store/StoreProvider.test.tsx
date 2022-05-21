import React from "react";
import { render, screen } from "@testing-library/react";

import { StoreProvider } from "./StoreProvider";

it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Native");
  const { asFragment } = render(
    <StoreProvider mode={"Native"}>Native</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "ReduxThunk");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxThunk"}>ReduxThunk</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "ReduxSaga");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxSaga"}>ReduxSaga</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "ReduxEffects");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxEffects"}>ReduxEffects</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
