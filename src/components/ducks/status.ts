import { TStatus } from "../main/MainNative";

export type TState = {
  value: TStatus;
};
export type TActionStatus = {
  type: string;
  status: TStatus;
};

const SET_STATUS = "cellular-automaton/status/set";

export const initialState: TState = {
  value: "stopped",
};
export default function reducer(
  state: TState = initialState,
  action: TActionStatus
): TState {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        value: action.status,
      };
    default:
      return state;
  }
}

export const actionSetStatus = (status: TStatus): TActionStatus => ({
  type: SET_STATUS,
  status,
});
