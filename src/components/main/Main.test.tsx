import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Main from "./Main";
import { DEF_ROWS, DEF_COLS, DEF_FILL, DEF_VELOCITY } from "../Defaults";

it("App renders correctly", () => {
  const { asFragment } = render(
    <Main user="User" onSignedOut={() => console.log("OK")} />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Main should change X size", () => {
  const probe = jest.fn((size) => {
    expect(size).toEqual(DEF_COLS + 1);
  });
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const input = utils.getByTestId("sizex");
  fireEvent.change(input, { target: { value: DEF_COLS + 1 } });
  expect(probe).toBeCalled();
});
it("Main should change Y size", () => {
  const probe = jest.fn((size) => {
    expect(size).toEqual(DEF_ROWS + 1);
  });
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const input = utils.getByTestId("sizey");
  fireEvent.change(input, { target: { value: DEF_ROWS + 1 } });
  expect(probe).toBeCalled();
});
it("Main should change Fill factor", () => {
  const probe = jest.fn((factor) => {
    expect(factor).toEqual(DEF_FILL + 1);
  });
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const input = utils.getByTestId("fillfactor");
  fireEvent.change(input, { target: { value: DEF_FILL + 1 } });
  expect(probe).toBeCalled();
});
it("Main should Run automaton", () => {
  const probe = jest.fn();
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const button = utils.getByTestId("actionrun");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("Main should Stop automaton", () => {
  const probe = jest.fn();
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const button = utils.getByTestId("actionstop");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("Main should Clear field", () => {
  const probe = jest.fn();
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const button = utils.getByTestId("actionclear");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("Main should Fill field", () => {
  const probe = jest.fn();
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const button = utils.getByTestId("actionfill");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("Main should fire Tick", () => {
  const probe = jest.fn();
  jest.useFakeTimers();
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const button = utils.getByTestId("actionrun");
  fireEvent.click(button);
  expect(probe).toBeCalled();
  jest.advanceTimersByTime(DEF_VELOCITY * 10);
  expect(probe).toBeCalledTimes(10 + 1);
});
it("Main should Set Automaton", () => {
  const probe = jest.fn((automaton) => {
    expect(automaton.id).toEqual(1);
  });
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const select = utils.getByTestId("automaton");
  fireEvent.change(select, { target: { value: 1 } });
  expect(probe).toBeCalled();
});
it("Main should Set Velocity", () => {
  const probe = jest.fn((velocity) => {
    expect(velocity).toEqual(2000);
  });
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const select = utils.getByTestId("velocity");
  fireEvent.change(select, { target: { value: 2000 } });
  expect(probe).toBeCalled();
});
it("Main should click Cell", () => {
  const probe = jest.fn((cell) => {
    expect(cell.row).toEqual(0);
    expect(cell.col).toEqual(0);
  });
  const utils = render(
    <Main user="User" onSignedOut={() => console.log("OK")} probe={probe} />
  );
  const cell = utils.getByTestId("R0:C0");
  fireEvent.click(cell);
  expect(probe).toBeCalled();
});
