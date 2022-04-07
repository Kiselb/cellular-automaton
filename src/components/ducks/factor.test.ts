import reducer, { TState, initialState, actionSetFactor } from "./factor";

it("Epoch reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN", factor: 0.25 });
  expect(newState).toEqual(initialState);
});
it("Epoch reducer values", () => {
  const newState = reducer(initialState, actionSetFactor(1));
  const expectedState: TState = {
    value: 1,
  };
  expect(newState).toEqual(expectedState);
});
it("Epoch reducer unknown action", () => {
  const newState = reducer(initialState, { type: "UNKNOWN", factor: 0.25 });

  expect(newState).toEqual(initialState);
});
