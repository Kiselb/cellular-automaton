import { put } from "redux-saga/effects";

import { actionSetFactor } from "../ducks/factor";

export const SET_FILL_FACTOR_SAGA = "SET_FILL_FACTOR_SAGA";

type SagaActionSetFactor = {
  type: typeof SET_FILL_FACTOR_SAGA;
  factor: number;
};

export const createSagaSetFactor = (factor: number): SagaActionSetFactor => ({
  type: SET_FILL_FACTOR_SAGA,
  factor,
});
export function* sagaSetFactor(action: SagaActionSetFactor) {
  yield put(actionSetFactor(action.factor));
}
