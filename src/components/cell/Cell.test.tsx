import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import {
  EMPTY_CELL_COLOR,
  DEF_MIN_COLOR,
  DEF_MAX_COLOR,
} from "../../domain/defaults";
import { Cell, calcCellColor } from "./types";

it("Cell renders correctly", () => {
  const { asFragment } = render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
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
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
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
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: EMPTY_CELL_COLOR });
});
it("Cell has style background color generation 1", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: calcCellColor(1) });
});
it("Cell has style background color generation 10", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={10}
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: calcCellColor(10) });
});
it("Cell has style background color generation 20", () => {
  render(
    <Cell
      row={1}
      col={1}
      generation={20}
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  const div = screen.getByTestId("R1:C1");
  expect(div).toHaveStyle({ background: calcCellColor(20) });
});
it("Cell mouse click event", () => {
  const onClick = jest.fn();
  render(
    <Cell
      row={1}
      col={1}
      generation={1}
      onClick={onClick}
      colorEmpty={EMPTY_CELL_COLOR}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
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
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      probe={probe}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
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
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      probe={probe}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
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
      onClick={() => null}
      colorEmpty={EMPTY_CELL_COLOR}
      probe={probe}
      minColor={DEF_MIN_COLOR}
      maxColor={DEF_MAX_COLOR}
    />
  );
  const div = screen.getByTestId("R1:C1");
  fireEvent.mouseOver(div);
  expect(probe).not.toBeCalled();
});
