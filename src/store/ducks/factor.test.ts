import reducer, {
  State,
  initialState,
  actionSetFactor,
  SET_FILLFACTOR,
} from "./factor";

it("Factor action naming convention", () => {
  expect(SET_FILLFACTOR).toMatch(/cellular-automaton\/factor\//);
});
it("Factor reducer initial state", () => {
  const newState = reducer(undefined, { type: "UNKNOWN", factor: 0.25 });
  expect(newState).toEqual(initialState);
});
it("Factor reducer values", () => {
  const newState = reducer(initialState, actionSetFactor(1));
  const expectedState: State = {
    value: 1,
  };
  expect(newState).toEqual(expectedState);
});
it("Factor reducer unknown action", () => {
  const newState = reducer(initialState, { type: "UNKNOWN", factor: 0.25 });

  expect(newState).toEqual(initialState);
});
