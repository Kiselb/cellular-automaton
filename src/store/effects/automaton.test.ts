import { expectSaga } from "redux-saga-test-plan";

import { DEF_AUTOMATON } from "../../domain/defaults";
import { AutomatonsList } from "../../components/automaton/types";
import { AutomatonDescription } from "../../components/automaton/types";
import reducer, { actionSetAutomaton } from "../ducks/automaton";
import { createSagaSetAutomaton, sagaSetAutomaton } from "./automaton";

it("Set automaton saga works", () => {
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  return expectSaga(sagaSetAutomaton, createSagaSetAutomaton(automaton))
    .put(actionSetAutomaton(automaton))
    .run();
});
it("Handles Automaton reducer", () => {
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  return expectSaga(sagaSetAutomaton, createSagaSetAutomaton(automaton))
    .withReducer(reducer)
    .run();
});
