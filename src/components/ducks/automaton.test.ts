import { AutomatonsList } from "../automaton/Automaton.types";
import reducer, { TState, actionSetAutomaton, initialState } from "./automaton";
import { DEF_AUTOMATON } from "../Defaults";
import { AutomatonDescription } from "../automaton/Automaton.types";

it("Automaton reducer initial state", () => {
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  const newState = reducer(undefined, { type: "UNKNOWN", automaton });
  expect(newState).toEqual(initialState);
});
it("Automaton reducer", () => {
  const state: TState = {
    value: AutomatonsList.filter(
      (automaton) => automaton.id === DEF_AUTOMATON
    )[0],
  };
  const newState = reducer(state, actionSetAutomaton(AutomatonsList[0]));
  const expectedState: TState = {
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
