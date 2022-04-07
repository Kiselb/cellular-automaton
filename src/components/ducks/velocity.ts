import { DEF_VELOCITY } from "../Defaults";

export type TState = {
  value: number;
};
export type TActionVelocity = {
  type: string;
  value: number;
};

const SET_VELOCITY = "cellular-automaton/velocity/set";
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
