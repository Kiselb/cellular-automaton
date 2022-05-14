import { call, put } from "redux-saga/effects";

import {
  actionSaveStateConfirm,
  actionSaveStateReject,
  actionLoadStateConfirm,
  actionLoadStateReject,
} from "../ducks/state";
import {
  actionSetSizeX,
  actionSetSizeY,
  actionLoadField,
} from "../ducks/gamelife";
import { actionSetAutomaton } from "../ducks/automaton";
import { actionResetEpoch } from "../ducks/epoch";
import { actionSetFactor } from "../ducks/factor";
import { actionSetStatus } from "../ducks/status";
import { actionSetVelocity } from "../ducks/velocity";

import { AppReduxState } from "../ducks/reducer";

export const LOCAL_STORAGE_KEY = "cellular-automaton.state";

export const STATE_SAVE_SAGA = "STATE_SAVE_SAGA";
export const STATE_RESTORE_SAGA = "STATE_RESTORE_SAGA";

export type SagaActionSaveStateRequest = {
  type: typeof STATE_SAVE_SAGA;
  state: AppReduxState;
};
export type SagaActionRestoreStateRequest = {
  type: typeof STATE_RESTORE_SAGA;
};

export const actionSagaSaveState = (
  state: AppReduxState
): SagaActionSaveStateRequest => ({
  type: STATE_SAVE_SAGA,
  state,
});
export const actionSagaRestoreState = (): SagaActionRestoreStateRequest => ({
  type: STATE_RESTORE_SAGA,
});

export const saveState = (state: AppReduxState) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
export const restoreState = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");

export function* saveStateSaga(action: SagaActionSaveStateRequest) {
  try {
    yield call(saveState, action.state);
    yield put(actionSaveStateConfirm());
  } catch (e) {
    yield put(
      actionSaveStateReject(
        e instanceof Error ? e.message : "Local storage write error"
      )
    );
  }
}
export function* restoreStateSaga() {
  try {
    const state: AppReduxState = yield call(restoreState);
    if (!!state) {
      yield put(actionLoadStateConfirm());
      yield put(actionSetStatus("stopped"));
      yield put(actionSetAutomaton(state.automaton.value));
      yield put(actionResetEpoch());
      yield put(actionSetFactor(state.factor.value));
      yield put(actionSetVelocity(state.velocity.value));
      yield put(actionSetSizeX(state.gameLife.data[0].length));
      yield put(actionSetSizeY(state.gameLife.data.length));
      yield put(actionLoadField(state.gameLife.data));
    } else {
      yield put(
        actionLoadStateReject("State not saved on the Local storage yet")
      );
    }
  } catch (e) {
    yield put(
      actionLoadStateReject(
        e instanceof Error
          ? e.message
          : "Restore state from Local storage error"
      )
    );
  }
}
