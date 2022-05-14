import { expectSaga } from "redux-saga-test-plan";

import { DEF_AUTOMATON } from "../../domain/defaults";
import { AutomatonsList } from "../../components/automaton/types";
import { AutomatonDescription } from "../../components/automaton/types";
import reducer, { actionIncEpoch, actionResetEpoch } from "../ducks/epoch";
import {
  sagaIncEpoch,
  sagaResetEpoch,
  INC_EPOCH_SAGA,
  RESET_EPOCH_SAGA,
  createSagaActionIncEpoch,
  createSagaActionResetEpoch,
} from "./epoch";

const automaton: AutomatonDescription = AutomatonsList.filter(
  (automaton) => automaton.id === DEF_AUTOMATON
)[0];

it("Epoch saga naming convention", () => {
  expect(INC_EPOCH_SAGA).toMatch(/INC_EPOCH_SAGA/);
  expect(RESET_EPOCH_SAGA).toMatch(/RESET_EPOCH_SAGA/);
});
it("Epoch saga actions objects", () => {
  expect(createSagaActionIncEpoch()).toEqual({ type: INC_EPOCH_SAGA });
  expect(createSagaActionResetEpoch()).toEqual({ type: RESET_EPOCH_SAGA });
});
it("Increment Epoch saga works", () => {
  return expectSaga(sagaIncEpoch)
    .withState({ automaton: { value: automaton } })
    .put(actionIncEpoch())
    .run();
});
it("Handles Epoch reducer", () => {
  return expectSaga(sagaIncEpoch)
    .withReducer(reducer)
    .withState({ automaton: { value: automaton } })
    .run();
});
it("Reset Epoch saga works", () => {
  return expectSaga(sagaResetEpoch).put(actionResetEpoch()).run();
});
it("Handles Epoch reducer", () => {
  return expectSaga(sagaResetEpoch).withReducer(reducer).run();
});
