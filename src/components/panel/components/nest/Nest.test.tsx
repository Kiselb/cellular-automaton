import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Nest } from "./types";

it("Panel renders correctly", () => {
  const data: number[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => 0)
  );
  const { asFragment } = render(
    <>
      {data.map((row, rowindex) =>
        row.map((cell, colindex) => (
          <Nest
            key={`R:${rowindex}:C${colindex}`}
            col={colindex}
            row={rowindex}
          >
            Test
          </Nest>
        ))
      )}
    </>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
