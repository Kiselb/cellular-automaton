import { AutomatonDescription } from "../../components/automaton/types";
import {
  DEF_ROWS,
  DEF_COLS,
  MIN_COLS,
  MAX_COLS,
  MIN_ROWS,
  MAX_ROWS,
  DEF_FILL,
} from "../../domain/defaults";
import {
  CalcState,
  ClearState,
  FillRandom,
  setXSize,
  setYSize,
  SetCell,
} from "../../domain/engine";

export const NEXT_EPOCH = "cellular-automaton/epoch/next";
export const CLEAR_FIELD = "cellular-automaton/field/clear";
export const FILL_FIELD = "cellular-automaton/field/fill";
export const SET_SIZE_X = "cellular-automaton/sizex/set";
export const SET_SIZE_Y = "cellular-automaton/sizey/set";
export const TOGGLE_CELL = "cellular-automaton/cell/toggle";
export const LOAD_FIELD = "cellular-automaton/field/load";
export const IDLE = "cellular-automaton/idle";

export type State = {
  data: number[][];
  rows: number;
  cols: number;
};
export type ActionSizeX = {
  type: typeof SET_SIZE_X;
  size: number;
};
export type ActionSizeY = {
  type: typeof SET_SIZE_Y;
  size: number;
};
export type ActionGameLifeFill = {
  type: typeof FILL_FIELD;
  fillFactor: number;
};
export type ActionGameLifeEpoch = {
  type: typeof NEXT_EPOCH;
  automaton: AutomatonDescription;
};
export type ActionGameLifeClear = {
  type: typeof CLEAR_FIELD;
};
export type ActionCell = {
  type: typeof TOGGLE_CELL;
  row: number;
  col: number;
};
export type ActionFieldLoad = {
  type: typeof LOAD_FIELD;
  data: number[][];
};
export type ActionIdle = {
  type: typeof IDLE;
};

export type TAction =
  | ActionGameLifeFill
  | ActionGameLifeEpoch
  | ActionGameLifeClear
  | ActionSizeX
  | ActionSizeY
  | ActionCell
  | ActionFieldLoad
  | ActionIdle;

export const initialState: State = {
  data: Array.from({ length: DEF_ROWS }, () =>
    Array.from({ length: DEF_COLS }, () => 0)
  ),
  rows: DEF_ROWS,
  cols: DEF_COLS,
};
export default function reducer(
  state: State = initialState,
  action: TAction
): State {
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
): ActionGameLifeEpoch => ({ type: NEXT_EPOCH, automaton });
export const actionFillField = (fillFactor: number): ActionGameLifeFill => ({
  type: FILL_FIELD,
  fillFactor,
});
export const actionClearFeild = (): ActionGameLifeClear => ({
  type: CLEAR_FIELD,
});
export const actionSetSizeX = (size: number): ActionSizeX => ({
  type: SET_SIZE_X,
  size,
});
export const actionSetSizeY = (size: number): ActionSizeY => ({
  type: SET_SIZE_Y,
  size,
});
export const actionToggleCell = (row: number, col: number): ActionCell => ({
  type: TOGGLE_CELL,
  row,
  col,
});
export const actionLoadField = (data: number[][]): ActionFieldLoad => ({
  type: LOAD_FIELD,
  data,
});
export const actionGameLifeIdle = (): ActionIdle => ({ type: IDLE });
