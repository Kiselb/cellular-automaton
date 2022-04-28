import { put } from "redux-saga/effects";

import { actionSetVelocity } from "../ducks/velocity";

export const SET_VELOCITY_SAGA = "SET_VELOCITY_SAGA";

type SagaActionSetVelocity = {
  type: typeof SET_VELOCITY_SAGA;
  velocity: number;
};

export const createSagaSetVelocity = (
  velocity: number
): SagaActionSetVelocity => ({
  type: SET_VELOCITY_SAGA,
  velocity,
});
export function* sagaSetVelocity(action: SagaActionSetVelocity) {
  yield put(actionSetVelocity(action.velocity));
}
