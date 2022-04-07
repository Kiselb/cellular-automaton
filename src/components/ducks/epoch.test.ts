import reducer, {
  TState,
  actionResetEpoch,
  actionIncEpoch,
  initialState,
} from "./epoch";

it("Epoch reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN" });
  expect(newState).toEqual(initialState);
});
it("Epoch reducer values", () => {
  const state: TState = {
    value: 10,
  };
  let newState = reducer(state, actionResetEpoch());
  let expectedState: TState = {
    value: 0,
  };
  expect(newState).toEqual(expectedState);

  newState = reducer(state, actionIncEpoch());
  expectedState = {
    value: 11,
  };
  expect(newState).toEqual(expectedState);
});
it("Epoch reducer unknown action", () => {
  const newState = reducer(initialState, { type: "UNKNOWN" });

  expect(newState).toEqual(initialState);
});
