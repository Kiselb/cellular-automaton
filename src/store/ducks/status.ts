import { Status } from "../../domain/types";

export type State = {
  value: Status;
};
export type ActionStatus = {
  type: string;
  status: Status;
};

const SET_STATUS = "cellular-automaton/status/set";

export const initialState: State = {
  value: "stopped",
};
export default function reducer(
  state: State = initialState,
  action: ActionStatus
): State {
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

export const actionSetStatus = (status: Status): ActionStatus => ({
  type: SET_STATUS,
  status,
});
