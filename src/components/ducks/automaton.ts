import { DEF_AUTOMATON } from "../Defaults";
import {
  AutomatonDescription,
  AutomatonsList,
} from "../automaton/Automaton.types";

export type TState = {
  value: AutomatonDescription;
};
export type TActionAutomaton = {
  type: string;
  automaton: AutomatonDescription;
};

const SET_AUTOMATON = "cellular-automaton/automaton/set";
export const initialState: TState = {
  value: AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0],
};

export default function reducer(
  state: TState = initialState,
  action: TActionAutomaton
): TState {
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
): TActionAutomaton => ({ type: SET_AUTOMATON, automaton: automaton });
