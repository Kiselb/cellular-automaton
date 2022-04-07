import { AutomatonDescription } from "../automaton/Automaton.types";
import {
  DEF_ROWS,
  DEF_COLS,
  MIN_COLS,
  MAX_COLS,
  MIN_ROWS,
  MAX_ROWS,
  DEF_FILL,
} from "../Defaults";
import {
  CalcState,
  ClearState,
  FillRandom,
  setXSize,
  setYSize,
  SetCell,
} from "../Engine";

const NEXT_EPOCH = "cellular-automaton/epoch/next";
const CLEAR_FIELD = "cellular-automaton/field/clear";
const FILL_FIELD = "cellular-automaton/field/fill";
const SET_SIZE_X = "cellular-automaton/sizex/set";
const SET_SIZE_Y = "cellular-automaton/sizey/set";
const TOGGLE_CELL = "cellular-automaton/cell/toggle";
const LOAD_FIELD = "cellular-automaton/field/load";
const IDLE = "cellular-automaton/idle";

export type TState = {
  data: number[][];
  rows: number;
  cols: number;
};
export type TActionSizeX = {
  type: typeof SET_SIZE_X;
  size: number;
};
export type TActionSizeY = {
  type: typeof SET_SIZE_Y;
  size: number;
};
export type TActionGameLifeFill = {
  type: typeof FILL_FIELD;
  fillFactor: number;
};
export type TActionGameLifeEpoch = {
  type: typeof NEXT_EPOCH;
  automaton: AutomatonDescription;
};
export type TActionGameLifeClear = {
  type: typeof CLEAR_FIELD;
};
export type TActionCell = {
  type: typeof TOGGLE_CELL;
  row: number;
  col: number;
};
export type TActionFieldLoad = {
  type: typeof LOAD_FIELD;
  data: number[][];
};
export type TActionIdle = {
  type: typeof IDLE;
};

export type TAction =
  | TActionGameLifeFill
  | TActionGameLifeEpoch
  | TActionGameLifeClear
  | TActionSizeX
  | TActionSizeY
  | TActionCell
  | TActionFieldLoad
  | TActionIdle;

export const initialState: TState = {
  data: Array.from({ length: DEF_ROWS }, () =>
    Array.from({ length: DEF_COLS }, () => 0)
  ),
  rows: DEF_ROWS,
  cols: DEF_COLS,
};
export default function reducer(
  state: TState = initialState,
  action: TAction
): TState {
  switch (action.type) {
    case NEXT_EPOCH:
      return {
        ...state,
        data: CalcState(state.data, action.automaton),
      };
    case CLEAR_FIELD:
      return {
        ...state,
        data: ClearState(state.data),
      };
    case FILL_FIELD:
      return {
        ...state,
        data: FillRandom(state.data, action.fillFactor || DEF_FILL),
      };
    case SET_SIZE_X:
      if (action.size < MIN_COLS || action.size > MAX_COLS) {
        return state;
      }
      return {
        ...state,
        cols: action.size,
        data: setXSize(state.data, action.size),
      };
    case SET_SIZE_Y:
      if (action.size < MIN_ROWS || action.size > MAX_ROWS) {
        return state;
      }
      return {
        ...state,
        rows: action.size,
        data: setYSize(state.data, action.size),
      };
    case TOGGLE_CELL:
      return {
        ...state,
        data: SetCell(state.data, action.row, action.col),
      };
    case LOAD_FIELD:
      return {
        ...state,
        rows: action.data.length,
        cols: action.data[0].length,
        data: action.data.map((row) => row.map((cell) => cell)),
      };
    default:
      return state;
  }
}

export const actionNextEpoch = (
  automaton: AutomatonDescription
): TActionGameLifeEpoch => ({ type: NEXT_EPOCH, automaton });
export const actionFillField = (fillFactor: number): TActionGameLifeFill => ({
  type: FILL_FIELD,
  fillFactor,
});
export const actionClearFeild = (): TActionGameLifeClear => ({
  type: CLEAR_FIELD,
});
export const actionSetSizeX = (size: number): TActionSizeX => ({
  type: SET_SIZE_X,
  size,
});
export const actionSetSizeY = (size: number): TActionSizeY => ({
  type: SET_SIZE_Y,
  size,
});
export const actionToggleCell = (row: number, col: number): TActionCell => ({
  type: TOGGLE_CELL,
  row,
  col,
});
export const actionLoadField = (data: number[][]): TActionFieldLoad => ({
  type: LOAD_FIELD,
  data,
});
export const actionGameLifeIdle = (): TActionIdle => ({ type: IDLE });
