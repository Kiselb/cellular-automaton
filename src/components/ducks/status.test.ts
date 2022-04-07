import reducer, { TState, initialState, actionSetStatus } from "./status";

it("Epoch reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN", status: "stopped" });
  expect(newState).toEqual(initialState);
});
it("Epoch reducer values", () => {
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
it("Epoch reducer unknown action", () => {
  const newState = reducer(initialState, {
    type: "UNKNOWN",
    status: "stopped",
  });

  expect(newState).toEqual(initialState);
});
