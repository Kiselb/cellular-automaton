export type State = {
  value: number;
};
export type ActionEpoch = {
  type: string;
};

export const RESET_EPOCH = "cellular-automaton/epoch/reset";
export const INC_EPOCH = "cellular-automaton/epoch/inc";

export const initialState: State = {
  value: 0,
};

export default function reducer(
  state: State = initialState,
  action: ActionEpoch
): State {
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

export const actionResetEpoch = (): ActionEpoch => ({ type: RESET_EPOCH });
export const actionIncEpoch = (): ActionEpoch => ({ type: INC_EPOCH });
