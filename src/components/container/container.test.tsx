import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { CellStatus } from "../cell/Cell";
import { Panel, PanelMode } from "../panel/Panel";
import { Container } from "./Container";

it("Container renders correctly", () => {
  const { asFragment } = render(<Container rows={10} cols={10} />);

  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Container has cell R1:C1", () => {
  render(<Container rows={10} cols={10} />);

  const div = screen.getByTestId("R1:C1") as HTMLDivElement;
  expect(div).toBeTruthy();
});
it("Container update rows and cols", () => {
  render(<Container rows={100} cols={100} />);

  const div = screen.getByTestId("R99:C99") as HTMLDivElement;
  expect(div).toBeTruthy();
});
it("Container event handler", () => {
  const probe = jest.fn();
  render(<Container rows={100} cols={100} probe={probe} />);

  const div = screen.getByTestId("R1:C1") as HTMLDivElement;
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  fireEvent.click(div);
  expect(probe).toBeCalledTimes(10);
});
