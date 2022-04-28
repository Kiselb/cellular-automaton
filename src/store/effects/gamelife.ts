import { put, select } from "redux-saga/effects";

import { AppReduxState } from "../../store/ducks/reducer";
import { actionClearFeild, actionFillField } from "../ducks/gamelife";

export const CLEAR_FIELD_SAGA = "CLEAR_FIELD_SAGA";
export const FILL_FIELD_SAGA = "FILL_FIELD_SAGA";

type SagaActionClearField = {
  type: typeof CLEAR_FIELD_SAGA;
};
type SagaActionFillField = {
  type: typeof FILL_FIELD_SAGA;
};

export const createSagaClearField = (): SagaActionClearField => ({
  type: CLEAR_FIELD_SAGA,
});
export const createSagaFillField = (): SagaActionFillField => ({
  type: FILL_FIELD_SAGA,
});
export function* sagaClearField() {
  yield put(actionClearFeild());
}
export function* sagaFillField() {
  const factor: number = yield select<(state: AppReduxState) => number>(
    (state) => state.factor.value
  );
  yield put(actionFillField(factor));
}
