import { put } from "redux-saga/effects";

import { actionSetSizeX, actionSetSizeY } from "../ducks/gamelife";

export const SET_SIZE_X_SAGA = "SET_SIZE_X_SAGA";
export const SET_SIZE_Y_SAGA = "SET_SIZE_Y_SAGA";

type SagaActionSetSize = {
  type: typeof SET_SIZE_X_SAGA | typeof SET_SIZE_Y_SAGA;
  size: number;
};

export const createSagaActionSetSizeX = (size: number): SagaActionSetSize => ({
  type: SET_SIZE_X_SAGA,
  size,
});
export const createSagaActionSetSizeY = (size: number): SagaActionSetSize => ({
  type: SET_SIZE_Y_SAGA,
  size,
});
export function* sagaSetSizeX(action: SagaActionSetSize) {
  yield put(actionSetSizeX(action.size));
}
export function* sagaSetSizeY(action: SagaActionSetSize) {
  yield put(actionSetSizeY(action.size));
}
