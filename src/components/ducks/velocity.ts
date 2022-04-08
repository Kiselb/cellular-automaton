import { DEF_VELOCITY } from "../Defaults";

const SET_VELOCITY = "cellular-automaton/velocity/set";
export const SET_VELOCITY_UNKNOWN = "cellular-automaton/velocity/unknown";

export type TState = {
  value: number;
};
export type TActionVelocity = {
  type: typeof SET_VELOCITY | typeof SET_VELOCITY_UNKNOWN;
  value: number;
};

export const initialState: TState = {
  value: DEF_VELOCITY,
};

export default function reducer(
  state: TState = initialState,
  action: TActionVelocity
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

export const actionSetVelocity = (value: number): TActionVelocity => ({
  type: SET_VELOCITY,
  value,
});
