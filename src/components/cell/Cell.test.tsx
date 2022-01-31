import React from "react";
import {
  render,
  fireEvent,
  screen,
} from "@testing-library/react";

import "@testing-library/jest-dom";
import { Cell } from "./Cell";

it("Cell renders correctly", () => {
  const { asFragment } = render(
    <Cell
      row={1}
      col={1}
      status={"alive"}
      onClick={() => alert("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
    />
  );
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Cell has style alive", () => {
  render(
    <Cell
      row={1}
      col={1}
      status={"alive"}
      onClick={() => console.log("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveClass("cell");
  expect(div).toHaveClass("cell--alive");
});
it("Cell has style old", () => {
  render(
    <Cell
      row={1}
      col={1}
      status={"old"}
      onClick={() => console.log("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveClass("cell");
  expect(div).toHaveClass("cell--old");
});
it("Cell has style dead", () => {
  render(
    <Cell
      row={1}
      col={1}
      status={"dead"}
      onClick={() => console.log("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveClass("cell");
  expect(div).toHaveClass("cell--dead");
});
it("Cell mouse click event", () => {
  const onClick = jest.fn();
  render(
    <Cell
      row={1}
      col={1}
      status={"alive"}
      onClick={onClick}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  fireEvent.click(div);

  expect(onClick).toBeCalled();
});
it("Cell mouse double click event", () => {
  const probe = jest.fn();
  render(
    <Cell
      row={1}
      col={1}
      status={"alive"}
      onClick={() => console.log("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
      probe={probe}
    />
  );
  const div = screen.getByTestId("R1:C1") as HTMLDivElement;
  fireEvent.doubleClick(div);
  expect(probe).toBeCalled();
});
it("Cell mouse over event with pressed button", () => {
  const probe = jest.fn();
  render(
    <Cell
      row={1}
      col={1}
      status={"alive"}
      onClick={() => console.log("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
      probe={probe}
    />
  );
  const div = screen.getByTestId("R1:C1");
  fireEvent.mouseOver(div, { buttons: 1 });
  expect(probe).toBeCalled();
});
it("Cell mouse over event without pressed button", () => {
  const probe = jest.fn();
  render(
    <Cell
      row={1}
      col={1}
      status={"alive"}
      onClick={() => console.log("OK")}
      colorAlive="green"
      colorDead="#ececec"
      colorOld="lightgreen"
      probe={probe}
    />
  );
  const div = screen.getByTestId("R1:C1");
  fireEvent.mouseOver(div);
  expect(probe).not.toBeCalled();
});
