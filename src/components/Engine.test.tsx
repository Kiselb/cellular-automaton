import {
  CalcIndexes,
  CalcLocality,
  CalcState,
  ClearState,
  FillRandom,
  setXSize,
  setYSize,
  SetCell,
} from "./Engine";
import {
  AutomatonDescription,
  AutomatonsList,
} from "./automaton/Automaton.types";

it("Calc localty indexes is correct 1", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const indexes = CalcIndexes(data, 0, 0);
  expect(indexes.ur).toEqual(2);
  expect(indexes.uc).toEqual(0);

  expect(indexes.rr).toEqual(0);
  expect(indexes.rc).toEqual(1);

  expect(indexes.dr).toEqual(1);
  expect(indexes.dc).toEqual(0);

  expect(indexes.lr).toEqual(0);
  expect(indexes.lc).toEqual(2);
});
it("Calc localty indexes is correct 2", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const indexes = CalcIndexes(data, 0, 2);
  expect(indexes.ur).toEqual(2);
  expect(indexes.uc).toEqual(2);

  expect(indexes.rr).toEqual(0);
  expect(indexes.rc).toEqual(0);

  expect(indexes.dr).toEqual(1);
  expect(indexes.dc).toEqual(2);

  expect(indexes.lr).toEqual(0);
  expect(indexes.lc).toEqual(1);
});
it("Calc localty indexes is correct 3", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const indexes = CalcIndexes(data, 2, 2);
  expect(indexes.ur).toEqual(1);
  expect(indexes.uc).toEqual(2);

  expect(indexes.rr).toEqual(2);
  expect(indexes.rc).toEqual(0);

  expect(indexes.dr).toEqual(0);
  expect(indexes.dc).toEqual(2);

  expect(indexes.lr).toEqual(2);
  expect(indexes.lc).toEqual(1);
});
it("Calc localty indexes is correct 4", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const indexes = CalcIndexes(data, 2, 0);
  expect(indexes.ur).toEqual(1);
  expect(indexes.uc).toEqual(0);

  expect(indexes.rr).toEqual(2);
  expect(indexes.rc).toEqual(1);

  expect(indexes.dr).toEqual(0);
  expect(indexes.dc).toEqual(0);

  expect(indexes.lr).toEqual(2);
  expect(indexes.lc).toEqual(2);
});
it("Calc cell locality Moore 1", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const locality = CalcLocality(data, 1, 1);
  expect(locality).toEqual(8);
});
it("Calc cell locality Moore 2", () => {
  const data = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 1);
  expect(locality).toEqual(0);
});
it("Calc cell locality Moore 3", () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 1);
  expect(locality).toEqual(1);
});
it("Calc cell locality Moore 4", () => {
  const data = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 0);
  expect(locality).toEqual(3);
});
it("Calc cell locality Neumann 1", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const locality = CalcLocality(data, 1, 1, "Neumann");
  expect(locality).toEqual(4);
});
it("Calc cell locality Neumann 2", () => {
  const data = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 1, "Neumann");
  expect(locality).toEqual(0);
});
it("Calc cell locality Neumann 3", () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 1, "Neumann");
  expect(locality).toEqual(0);
});
it("Calc cell locality Neumann 4", () => {
  const data = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];
  const locality = CalcLocality(data, 0, 1, "Neumann");
  expect(locality).toEqual(3);
});
it("Calc State 1", () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === 15
  )[0];
  const state = CalcState(data, automaton);
  expect(state).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});
it("Calc State 2", () => {
  const data = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === 15
  )[0];
  const state = CalcState(data, automaton);
  expect(state).toEqual([
    [2, 2, 1],
    [1, 2, 1],
    [1, 1, 1],
  ]);
});
it("Clear field", () => {
  const data: number[][] = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const result: number[][] = ClearState(data);
  expect(
    result.reduce(
      (acc, item) => acc + item.reduce((acc, cell) => acc + cell, 0),
      0
    )
  ).toEqual(0);
});
it("Fill random field", () => {
  const data: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const result: number[][] = FillRandom(data, 50);
  const filling: number = result.reduce(
    (acc, item) => acc + item.reduce((acc, cell) => acc + cell, 0),
    0
  );
  expect(filling).toBeLessThanOrEqual(9);
});
it("X Size changing", () => {
  const data: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const result = setXSize(data, 15);
  expect(result.length).toEqual(10);
  expect(result[0].length).toEqual(15);
});
it("X Size changing low limit", () => {
  const data: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const result = setXSize(data, 4 - 1);
  expect(result.length).toEqual(5);
  expect(result[0].length).toEqual(5);
});
it("X Size changing same", () => {
  const data: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const result = setXSize(data, 5);
  expect(result.length).toEqual(5);
  expect(result[0].length).toEqual(5);
});
it("Y Size changing", () => {
  const data: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const result = setYSize(data, 15);
  expect(result.length).toEqual(15);
  expect(result[0].length).toEqual(10);
});
it("Y Size changing low limit", () => {
  const data: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const result = setYSize(data, 4 - 1);
  expect(result.length).toEqual(5);
  expect(result[0].length).toEqual(5);
});
it("Y Size changing same", () => {
  const data: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const result = setYSize(data, 5);
  expect(result.length).toEqual(5);
  expect(result[0].length).toEqual(5);
});
it("Set Cell to 1", () => {
  const data: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const result = SetCell(data, 1, 1);
  expect(result[0][0]).toEqual(0);
  expect(result[0][1]).toEqual(0);
  expect(result[0][2]).toEqual(0);
  expect(result[1][0]).toEqual(0);
  expect(result[1][1]).toEqual(1);
  expect(result[1][2]).toEqual(0);
  expect(result[2][0]).toEqual(0);
  expect(result[2][1]).toEqual(0);
  expect(result[2][2]).toEqual(0);
});
it("Set Cell to 0", () => {
  const data: number[][] = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  const result = SetCell(data, 1, 1);
  expect(result[0][0]).toEqual(0);
  expect(result[0][1]).toEqual(0);
  expect(result[0][2]).toEqual(0);
  expect(result[1][0]).toEqual(0);
  expect(result[1][1]).toEqual(0);
  expect(result[1][2]).toEqual(0);
  expect(result[2][0]).toEqual(0);
  expect(result[2][1]).toEqual(0);
  expect(result[2][2]).toEqual(0);
});
