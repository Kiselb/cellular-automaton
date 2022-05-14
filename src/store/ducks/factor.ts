import { DEF_FILL } from "../../domain/defaults";

export type State = {
  value: number;
};
export type ActionFactor = {
  type: string;
  factor: number;
};

export const SET_FILLFACTOR = "cellular-automaton/factor/set";

export const initialState: State = {
  value: DEF_FILL,
};
export default function reducer(
  state: State = initialState,
  action: ActionFactor
): State {
  switch (action.type) {
    case SET_FILLFACTOR:
      return {
        ...state,
        value: action.factor,
      };
    default:
      return state;
  }
}

export const actionSetFactor = (factor: number): ActionFactor => ({
  type: SET_FILLFACTOR,
  factor,
});
