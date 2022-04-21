import { AutomatonsList } from "../../components/automaton/types";
import reducer, { State, actionSetAutomaton, initialState } from "./automaton";
import { DEF_AUTOMATON } from "../../domain/defaults";
import { AutomatonDescription } from "../../components/automaton/types";

it("Automaton reducer initial state", () => {
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  const newState = reducer(undefined, { type: "UNKNOWN", automaton });
  expect(newState).toEqual(initialState);
});
it("Automaton reducer", () => {
  const state: State = {
    value: AutomatonsList.filter(
      (automaton) => automaton.id === DEF_AUTOMATON
    )[0],
  };
  const newState = reducer(state, actionSetAutomaton(AutomatonsList[0]));
  const expectedState: State = {
    value: AutomatonsList[0],
  };
  expect(newState).toEqual(expectedState);
});
it("Automaton reducer unknown action", () => {
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  const newState = reducer(initialState, { type: "UNKNOWN", automaton });

  expect(newState).toEqual(initialState);
});
