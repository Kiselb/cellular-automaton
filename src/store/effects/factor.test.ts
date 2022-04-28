import { expectSaga } from "redux-saga-test-plan";

import reducer, { actionSetFactor } from "../ducks/factor";
import { createSagaSetFactor, sagaSetFactor } from "./factor";

it("Set Factor saga works", () => {
  return expectSaga(sagaSetFactor, createSagaSetFactor(50))
    .put(actionSetFactor(50))
    .run();
});
it("Handles Factor reducer", () => {
  return expectSaga(sagaSetFactor, createSagaSetFactor(50))
    .withReducer(reducer)
    .run();
});
