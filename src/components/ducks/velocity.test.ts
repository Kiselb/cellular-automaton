import reducer, { TState, initialState, actionSetVelocity } from "./velocity";

it("Epoch reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN", value: 100 });
  expect(newState).toEqual(initialState);
});
it("Epoch reducer values", () => {
  const newState = reducer(initialState, actionSetVelocity(1000));
  const expectedState: TState = {
    value: 1000,
  };
  expect(newState).toEqual(expectedState);
});
it("Epoch reducer unknown action", () => {
  const newState = reducer(initialState, { type: "UNKNOWN", value: 100 });

  expect(newState).toEqual(initialState);
});
