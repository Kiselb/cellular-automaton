export type TState = {
  value: number;
};
export type TActionEpoch = {
  type: string;
};

const RESET_EPOCH = "cellular-automaton/epoch/reset";
const INC_EPOCH = "cellular-automaton/epoch/inc";

export const initialState: TState = {
  value: 0,
};

export default function reducer(
  state: TState = initialState,
  action: TActionEpoch
): TState {
  switch (action.type) {
    case RESET_EPOCH:
      return {
        ...state,
        value: 0,
      };
    case INC_EPOCH:
      return {
        ...state,
        value: state.value + 1,
      };
    default:
      return state;
  }
}

export const actionResetEpoch = (): TActionEpoch => ({ type: RESET_EPOCH });
export const actionIncEpoch = (): TActionEpoch => ({ type: INC_EPOCH });
