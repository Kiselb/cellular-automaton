import reducer, {
  State,
  initialState,
  actionNextEpoch,
  actionFillField,
  actionClearFeild,
  actionSetSizeX,
  actionSetSizeY,
  actionToggleCell,
  actionLoadField,
  actionGameLifeIdle,
  NEXT_EPOCH,
  CLEAR_FIELD,
  FILL_FIELD,
  SET_SIZE_X,
  SET_SIZE_Y,
  TOGGLE_CELL,
  LOAD_FIELD,
  IDLE,
} from "./gamelife";
import {
  MIN_ROWS,
  MAX_ROWS,
  DEF_ROWS,
  MIN_COLS,
  MAX_COLS,
  DEF_COLS,
  DEF_AUTOMATON,
} from "../../domain/defaults";
import { AutomatonsList } from "../../components/automaton/types";

it("Actions naming convention", () => {
  expect(NEXT_EPOCH).toMatch(/cellular-automaton\/epoch\//);
  expect(CLEAR_FIELD).toMatch(/cellular-automaton\/field\//);
  expect(FILL_FIELD).toMatch(/cellular-automaton\/field\//);
  expect(SET_SIZE_X).toMatch(/cellular-automaton\/size/);
  expect(SET_SIZE_Y).toMatch(/cellular-automaton\/size/);
  expect(TOGGLE_CELL).toMatch(/cellular-automaton\/cell\/toggle/);
  expect(LOAD_FIELD).toMatch(/cellular-automaton\/field\//);
  expect(IDLE).toMatch(/cellular-automaton\/idle/);
});
it("Game Life reducer initial state", () => {
  const newState = reducer(undefined, actionGameLifeIdle());
  expect(newState).toEqual(initialState);
});
it("Game Life reducer clear field", () => {
  const state: State = {
    data: Array.from({ length: DEF_ROWS }, () =>
      Array.from({ length: DEF_COLS }, () => 1)
    ),
    rows: DEF_ROWS,
    cols: DEF_COLS,
  };
  const newState = reducer(state, actionClearFeild());
  const expectedState: State = {
    data: Array.from({ length: DEF_ROWS }, () =>
      Array.from({ length: DEF_COLS }, () => 0)
    ),
    rows: DEF_ROWS,
    cols: DEF_COLS,
  };
  expect(newState).toEqual(expectedState);
});
it("Game Life reducer fill field", () => {
  const newState = reducer(initialState, actionFillField(0.5));
  const total: number = newState.data.reduce(
    (afield, row) => afield + row.reduce((arow, cell) => arow + cell, 0),
    0
  );
  expect(total).toBeGreaterThan(0);
});
it("Game Life reducer set size X", () => {
  let newState = reducer(initialState, actionSetSizeX(DEF_ROWS + 1));
  expect(newState.data[0].length).toBe(DEF_ROWS + 1);
  newState = reducer(initialState, actionSetSizeX(DEF_ROWS));
  expect(newState.data[0].length).toBe(DEF_ROWS);
  newState = reducer(initialState, actionSetSizeX(MIN_ROWS - 1));
  expect(newState.data[0].length).toBe(DEF_ROWS);
  newState = reducer(initialState, actionSetSizeX(MAX_ROWS + 1));
  expect(newState.data[0].length).toBe(DEF_ROWS);
});
it("Game Life reducer set size Y", () => {
  let newState = reducer(initialState, actionSetSizeY(DEF_COLS + 1));
  expect(newState.data.length).toBe(DEF_COLS + 1);
  newState = reducer(initialState, actionSetSizeY(DEF_COLS));
  expect(newState.data.length).toBe(DEF_COLS);
  newState = reducer(initialState, actionSetSizeY(MIN_COLS - 1));
  expect(newState.data.length).toBe(DEF_COLS);
  newState = reducer(initialState, actionSetSizeY(MAX_COLS + 1));
  expect(newState.data.length).toBe(DEF_COLS);
});
it("Game Life reducer toggle cell", () => {
  let newState = reducer(initialState, actionToggleCell(0, 0));
  let total: number = newState.data.reduce(
    (afield, row) => afield + row.reduce((arow, cell) => arow + cell, 0),
    0
  );
  expect(newState.data[0][0]).toBe(1);
  expect(total).toBe(1);
  newState = reducer(newState, actionToggleCell(0, 0));
  total = newState.data.reduce(
    (afield, row) => afield + row.reduce((arow, cell) => arow + cell, 0),
    0
  );
  expect(newState.data[0][0]).toBe(0);
  expect(total).toBe(0);
});
it("Game Life load field", () => {
  const toLoad = Array.from({ length: DEF_ROWS }, () =>
    Array.from({ length: DEF_COLS }, () => 1)
  );
  const newState = reducer(initialState, actionLoadField(toLoad));
  expect(newState.data).toEqual(toLoad);
});
it("Game Life reducer set epoch", () => {
  const automaton = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  initialState.data[0][0] = 1;
  initialState.data[0][1] = 1;
  initialState.data[1][0] = 1;
  const state = reducer(initialState, actionNextEpoch(automaton));
  const expectedState: State = {
    data: Array.from({ length: DEF_ROWS }, () =>
      Array.from({ length: DEF_COLS }, () => 0)
    ),
    rows: DEF_ROWS,
    cols: DEF_COLS,
  };
  expectedState.data[0][0] = 2;
  expectedState.data[0][1] = 2;
  expectedState.data[1][0] = 2;
  expectedState.data[1][1] = 1;
  expect(state).toEqual(expectedState);
});
