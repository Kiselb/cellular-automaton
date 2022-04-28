import { expectSaga } from "redux-saga-test-plan";

import reducer, { actionSetVelocity } from "../ducks/velocity";
import { createSagaSetVelocity, sagaSetVelocity } from "./velocity";

it("Set Factor saga works", () => {
  return expectSaga(sagaSetVelocity, createSagaSetVelocity(1000))
    .put(actionSetVelocity(1000))
    .run();
});
it("Handles Factor reducer", () => {
  return expectSaga(sagaSetVelocity, createSagaSetVelocity(1000))
    .withReducer(reducer)
    .run();
});
