import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Cell, calcCellColor } from "./Cell";

it("Cell renders correctly", () => {
  const { asFragment } = render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
    />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Cell has style", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveClass("cell");
});
it("Cell has style background color generation 0", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={0}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: "#ececec" });
});
it("Cell has style background color generation 1", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: calcCellColor("lightgreen", 1) });
});
it("Cell has style background color generation 10", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={10}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: calcCellColor("lightgreen", 10) });
});
it("Cell has style background color generation 20", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={20}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: calcCellColor("lightgreen", 20) });
});
it("Cell mouse click event", () => {
  const onClick = jest.fn();
  render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={onClick}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
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
      generation={1}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
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
      generation={1}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
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
      generation={1}
      onClick={() => console.log("OK")}
      colorEmpty="#ececec"
      colorGamma="lightgreen"
      probe={probe}
    />
  );
  const div = screen.getByTestId("R1:C1");
  fireEvent.mouseOver(div);
  expect(probe).not.toBeCalled();
});
