import reducer, { TState, initialState, actionSetStatus } from "./status";

it("Status reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN", status: "stopped" });
  expect(newState).toEqual(initialState);
});
it("Status reducer values", () => {
  let newState = reducer(initialState, actionSetStatus("playing"));
  let expectedState: TState = {
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
