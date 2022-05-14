import React from "react";
import { render, screen } from "@testing-library/react";

import { StoreProvider } from "./StoreProvider";

it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"Native"}>Test</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxThunk"}>Test</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxSaga"}>Test</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("App renders correctly", () => {
  localStorage.setItem("cellular-automaton.user", "Test");
  const { asFragment } = render(
    <StoreProvider mode={"ReduxEffects"}>Test</StoreProvider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
