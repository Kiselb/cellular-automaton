import React from "react";
import {
  render,
  fireEvent,
  screen,
} from "@testing-library/react";

import "@testing-library/jest-dom";
import { CellStatus } from "../cell/Cell";
import { Panel, PanelMode } from "./Panel";

it("Panel renders correctly", () => {
  const data: CellStatus[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => "dead")
  );
  const mode: PanelMode = "paused";
  const { asFragment } = render(
    <Panel data={data} mode={mode} onChange={() => console.log("OK")} />
  );
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Panel Cell click event", () => {
  const data: CellStatus[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => "dead")
  );
  const mode: PanelMode = "paused";
  const probe = jest.fn();
  render(<Panel data={data} mode={mode} onChange={probe} />);
  const div = screen.getByTestId("R1:C1");
  fireEvent.click(div);
  expect(probe).toBeCalled();
});
