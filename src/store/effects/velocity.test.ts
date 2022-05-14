import { expectSaga } from "redux-saga-test-plan";

import reducer, { actionSetVelocity } from "../ducks/velocity";
import {
  createSagaSetVelocity,
  sagaSetVelocity,
  SET_VELOCITY_SAGA,
} from "./velocity";

it("Velocity saga naming convention", () => {
  expect(SET_VELOCITY_SAGA).toMatch(/SET_VELOCITY_SAGA/);
});
it("Set Velocity saga works", () => {
  return expectSaga(sagaSetVelocity, createSagaSetVelocity(1000))
    .put(actionSetVelocity(1000))
    .run();
});
it("Handles Velocity reducer", () => {
  return expectSaga(sagaSetVelocity, createSagaSetVelocity(1000))
    .withReducer(reducer)
    .run();
});
