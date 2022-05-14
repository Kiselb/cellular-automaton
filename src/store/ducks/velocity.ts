import { DEF_VELOCITY } from "../../domain/defaults";

export const SET_VELOCITY = "cellular-automaton/velocity/set";
export const SET_VELOCITY_UNKNOWN = "cellular-automaton/velocity/unknown";

export type State = {
  value: number;
};
export type ActionVelocity = {
  type: typeof SET_VELOCITY | typeof SET_VELOCITY_UNKNOWN;
  value: number;
};

export const initialState: State = {
  value: DEF_VELOCITY,
};

export default function reducer(
  state: State = initialState,
  action: ActionVelocity
) {
  switch (action.type) {
    case SET_VELOCITY:
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
}

export const actionSetVelocity = (value: number): ActionVelocity => ({
  type: SET_VELOCITY,
  value,
});
