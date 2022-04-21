import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Row } from "./types";

it("Panel renders correctly", () => {
  const data: number[] = Array.from({ length: 4 }, () => 0);
  const { asFragment } = render(
    <>
      {data.map((_, rowindex) => (
        <Row key={`R:${rowindex}`} row={rowindex}>
          Test
        </Row>
      ))}
    </>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
