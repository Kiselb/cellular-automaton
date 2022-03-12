import { CalcIndexes, CalcLocality, CalcState } from "./Engine";
import { AutomatonDescription, AutomatonsList } from "./automaton/Automaton";

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
it("Calc cell locality 1", () => {
  const data = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const locality = CalcLocality(data, 1, 1);
  expect(locality).toEqual(8);
});
it("Calc cell locality 2", () => {
  const data = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 1);
  expect(locality).toEqual(0);
});
it("Calc cell locality 3", () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 1);
  expect(locality).toEqual(1);
});
it("Calc cell locality 4", () => {
  const data = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const locality = CalcLocality(data, 1, 0);
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
