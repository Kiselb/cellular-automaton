import { expectSaga } from "redux-saga-test-plan";

import { DEF_AUTOMATON } from "../../domain/defaults";
import { AutomatonsList } from "../../components/automaton/types";
import { AutomatonDescription } from "../../components/automaton/types";
import reducer, { actionIncEpoch, actionResetEpoch } from "../ducks/epoch";
import { sagaIncEpoch, sagaResetEpoch } from "./epoch";

const automaton: AutomatonDescription = AutomatonsList.filter(
  (automaton) => automaton.id === DEF_AUTOMATON
)[0];

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
