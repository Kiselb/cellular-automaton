import { ThunkDispatch } from "redux-thunk";

import { TAppReduxState } from "./reducer";
import { TActionSizeX, TActionSizeY, TActionFieldLoad } from "./gamelife";
import { TActionAutomaton } from "./automaton";
import { TActionEpoch } from "./epoch";
import { TActionFactor } from "./factor";
import { TActionStatus } from "./status";
import { TActionVelocity } from "./velocity";

import { actionSetSizeX, actionSetSizeY, actionLoadField } from "./gamelife";
import { actionSetAutomaton } from "./automaton";
import { actionResetEpoch } from "./epoch";
import { actionSetFactor } from "./factor";
import { actionSetStatus } from "./status";
import { actionSetVelocity } from "./velocity";

const STATE_SAVE_CONFIRM = "cellular-automaton/state/save/confirm";
const STATE_SAVE_REJECT = "cellular-automaton/state/save/failed";
const STATE_LOAD_CONFIRM = "cellular-automaton/state/load/confirm";
const STATE_LOAD_REJECT = "cellular-automaton/state/load/failed";
export const STATE_LOAD_UNKNOWN = "cellular-automaton/state/unknown";

export type TState = {
  error: string;
};
type TActionSaveStateConfim = {
  type: typeof STATE_SAVE_CONFIRM;
};
type TActionSaveStateReject = {
  type: typeof STATE_SAVE_REJECT;
  error: string;
};
type TActionLoadStateConfim = {
  type: typeof STATE_LOAD_CONFIRM;
};
type TActionLoadStateReject = {
  type: typeof STATE_LOAD_REJECT;
  error: string;
};
export type TActionUnknown = {
  type: typeof STATE_LOAD_UNKNOWN;
};

export type TAction =
  | TActionSaveStateConfim
  | TActionSaveStateReject
  | TActionLoadStateConfim
  | TActionLoadStateReject
  | TActionUnknown;

export const initialState = { error: "" };

export default function reducer(state: TState = initialState, action: TAction) {
  switch (action.type) {
    case STATE_SAVE_CONFIRM:
      return {
        ...state,
        error: "",
      };
    case STATE_SAVE_REJECT:
      return {
        ...state,
        error: action.error,
      };
    case STATE_LOAD_CONFIRM:
      return {
        ...state,
        error: "",
      };
    case STATE_LOAD_REJECT:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export const thunkSaveState = async (
  dispatch: ThunkDispatch<
    TAppReduxState,
    undefined,
    TActionSaveStateConfim | TActionSaveStateReject
  >,
  getState: () => TAppReduxState
) => {
  try {
    await localStorage.setItem(
      "cellular-automaton.state",
      JSON.stringify(getState())
    );
    dispatch(actionSaveStateConfirm());
  } catch (e: unknown) {
    dispatch(
      actionSaveStateReject(
        e instanceof Error ? e.message : "Local storage write error"
      )
    );
  }
};
export const thunkLoadState = async (
  dispatch: ThunkDispatch<
    TAppReduxState,
    undefined,
    | TActionLoadStateConfim
    | TActionLoadStateReject
    | TActionSizeX
    | TActionSizeY
    | TActionFieldLoad
    | TActionAutomaton
    | TActionEpoch
    | TActionFactor
    | TActionStatus
    | TActionVelocity
  >,
  getState: () => TAppReduxState
) => {
  try {
    const state = JSON.parse(
      (await localStorage.getItem("cellular-automaton.state")) || ""
    );
    dispatch(actionLoadStateConfirm());
    if (!!state) {
      dispatch(actionSetStatus("stopped"));
      dispatch(actionSetAutomaton(state.automaton.value));
      dispatch(actionResetEpoch());
      dispatch(actionSetFactor(state.factor.value));
      dispatch(actionSetVelocity(state.velocity.value));
      dispatch(actionSetSizeX(state.gameLife.data[0].length));
      dispatch(actionSetSizeY(state.gameLife.data.length));
      dispatch(actionLoadField(state.gameLife.data));
    }
  } catch (e: unknown) {
    dispatch(
      actionLoadStateReject(
        e instanceof Error ? e.message : "Local storage write error"
      )
    );
  }
};

export const actionSaveState = () => thunkSaveState;
export const actionSaveStateConfirm = (): TActionSaveStateConfim => ({
  type: STATE_SAVE_CONFIRM,
});
export const actionSaveStateReject = (
  error: string
): TActionSaveStateReject => ({ type: STATE_SAVE_REJECT, error });

export const actionLoadState = () => thunkLoadState;
export const actionLoadStateConfirm = (): TActionLoadStateConfim => ({
  type: STATE_LOAD_CONFIRM,
});
export const actionLoadStateReject = (
  error: string
): TActionLoadStateReject => ({ type: STATE_LOAD_REJECT, error });
