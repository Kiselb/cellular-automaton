import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Plate } from "./types";

it("Panel renders correctly", () => {
  const { asFragment } = render(<Plate>Test</Plate>);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
