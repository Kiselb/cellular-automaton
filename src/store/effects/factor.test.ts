import { expectSaga } from "redux-saga-test-plan";

import reducer, { actionSetFactor } from "../ducks/factor";
import {
  createSagaSetFactor,
  sagaSetFactor,
  SET_FILL_FACTOR_SAGA,
} from "./factor";

it("Factor saga naming convention", () => {
  expect(SET_FILL_FACTOR_SAGA).toMatch(/SET_FILL_FACTOR_SAGA/);
});
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
