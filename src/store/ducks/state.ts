import { ThunkDispatch } from "redux-thunk";

import { AppReduxState } from "./reducer";
import { ActionSizeX, ActionSizeY, ActionFieldLoad } from "./gamelife";
import { ActionAutomaton } from "./automaton";
import { ActionEpoch } from "./epoch";
import { ActionFactor } from "./factor";
import { ActionStatus } from "./status";
import { ActionVelocity } from "./velocity";

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

export type State = {
  error: string;
};
type ActionSaveStateConfim = {
  type: typeof STATE_SAVE_CONFIRM;
};
type ActionSaveStateReject = {
  type: typeof STATE_SAVE_REJECT;
  error: string;
};
type ActionLoadStateConfim = {
  type: typeof STATE_LOAD_CONFIRM;
};
type ActionLoadStateReject = {
  type: typeof STATE_LOAD_REJECT;
  error: string;
};
export type ActionUnknown = {
  type: typeof STATE_LOAD_UNKNOWN;
};

export type Action =
  | ActionSaveStateConfim
  | ActionSaveStateReject
  | ActionLoadStateConfim
  | ActionLoadStateReject
  | ActionUnknown;

export const initialState = { error: "" };

export default function reducer(state: State = initialState, action: Action) {
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
    AppReduxState,
    undefined,
    ActionSaveStateConfim | ActionSaveStateReject
  >,
  getState: () => AppReduxState
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
    AppReduxState,
    undefined,
    | ActionLoadStateConfim
    | ActionLoadStateReject
    | ActionSizeX
    | ActionSizeY
    | ActionFieldLoad
    | ActionAutomaton
    | ActionEpoch
    | ActionFactor
    | ActionStatus
    | ActionVelocity
  >
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
export const actionSaveStateConfirm = (): ActionSaveStateConfim => ({
  type: STATE_SAVE_CONFIRM,
});
export const actionSaveStateReject = (
  error: string
): ActionSaveStateReject => ({ type: STATE_SAVE_REJECT, error });

export const actionLoadState = () => thunkLoadState;
export const actionLoadStateConfirm = (): ActionLoadStateConfim => ({
  type: STATE_LOAD_CONFIRM,
});
export const actionLoadStateReject = (
  error: string
): ActionLoadStateReject => ({ type: STATE_LOAD_REJECT, error });
