import reducer, {
  State,
  actionResetEpoch,
  actionIncEpoch,
  initialState,
  RESET_EPOCH,
  INC_EPOCH,
} from "./epoch";

it("Epoch actions naming convention", () => {
  expect(RESET_EPOCH).toMatch(/cellular-automaton\/epoch\//);
  expect(INC_EPOCH).toMatch(/cellular-automaton\/epoch\//);
});
it("Epoch reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN" });
  expect(newState).toEqual(initialState);
});
it("Epoch reducer values", () => {
  const state: State = {
    value: 10,
  };
  let newState = reducer(state, actionResetEpoch());
  let expectedState: State = {
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
