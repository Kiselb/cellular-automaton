import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DEF_MIN_COLOR, DEF_MAX_COLOR } from "../../domain/defaults";
import { Panel } from "./types";

it("Panel renders correctly", () => {
  const data: number[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => 0)
  );
  const { asFragment } = render(
    <Panel
      data={data}
      onChange={() => console.log("OK")}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Panel Cell click event", () => {
  const data: number[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => 0)
  );
  const probe = jest.fn();
  render(
    <Panel
      data={data}
      onChange={probe}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  const div = screen.getByTestId("R1:C1");
  fireEvent.click(div);
  expect(probe).toBeCalled();
});
