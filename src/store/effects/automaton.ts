import { put } from "redux-saga/effects";

import { AutomatonDescription } from "../../components/automaton/types";
import { actionSetAutomaton } from "../ducks/automaton";

export const SET_AUTOMATON_SAGA = "SET_AUTOMATON_SAGA";

type SagaActionSetAutomaton = {
  type: typeof SET_AUTOMATON_SAGA;
  automaton: AutomatonDescription;
};

export const createSagaSetAutomaton = (
  automaton: AutomatonDescription
): SagaActionSetAutomaton => ({
  type: SET_AUTOMATON_SAGA,
  automaton,
});
export function* sagaSetAutomaton(action: SagaActionSetAutomaton) {
  yield put(actionSetAutomaton(action.automaton));
}
