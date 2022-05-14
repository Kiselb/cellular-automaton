import { DEF_AUTOMATON } from "../../domain/defaults";
import {
  AutomatonDescription,
  AutomatonsList,
} from "../../components/automaton/types";

export type State = {
  value: AutomatonDescription;
};
export type ActionAutomaton = {
  type: string;
  automaton: AutomatonDescription;
};

export const SET_AUTOMATON = "cellular-automaton/automaton/set";
export const initialState: State = {
  value: AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0],
};

export default function reducer(
  state: State = initialState,
  action: ActionAutomaton
): State {
  switch (action.type) {
    case SET_AUTOMATON:
      return {
        ...state,
        value: {
          ...action.automaton,
          born: [...action.automaton.born],
          save: [...action.automaton.save],
        },
      };
    default:
      return state;
  }
}

export const actionSetAutomaton = (
  automaton: AutomatonDescription
): ActionAutomaton => ({ type: SET_AUTOMATON, automaton: automaton });
