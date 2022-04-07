import { DEF_FILL } from "../Defaults";

export type TState = {
  value: number;
};
export type TActionFactor = {
  type: string;
  factor: number;
};

const SET_FILLFACTOR = "cellular-automaton/factor/set";

export const initialState: TState = {
  value: DEF_FILL,
};
export default function reducer(
  state: TState = initialState,
  action: TActionFactor
): TState {
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

export const actionSetFactor = (factor: number): TActionFactor => ({
  type: SET_FILLFACTOR,
  factor,
});
