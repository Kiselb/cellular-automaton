import reducer, {
  State,
  initialState,
  actionSetStatus,
  SET_STATUS,
} from "./status";

it("Status action naming convention", () => {
  expect(SET_STATUS).toMatch(/cellular-automaton\/status\//);
});
it("Status reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN", status: "stopped" });
  expect(newState).toEqual(initialState);
});
it("Status reducer values", () => {
  let newState = reducer(initialState, actionSetStatus("playing"));
  let expectedState: State = {
    value: "playing",
  };
  expect(newState).toEqual(expectedState);

  newState = reducer(initialState, actionSetStatus("stopped"));
  expectedState = {
    value: "stopped",
  };
  expect(newState).toEqual(expectedState);
});
it("Status reducer unknown action", () => {
  const newState = reducer(initialState, {
    type: "UNKNOWN",
    status: "stopped",
  });

  expect(newState).toEqual(initialState);
});
