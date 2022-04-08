import reducer, {
  TState,
  initialState,
  STATE_LOAD_UNKNOWN,
  TActionUnknown,
  actionSaveStateConfirm,
  actionSaveStateReject,
  actionLoadStateConfirm,
  actionLoadStateReject,
} from "./state";

it("State reducer initial state", () => {
  const action: TActionUnknown = { type: STATE_LOAD_UNKNOWN };
  const newState = reducer(undefined, action);
  expect(newState).toEqual(initialState);
});
it("State reducer save confirm", () => {
  const newState = reducer(initialState, actionSaveStateConfirm());
  const expectedState: TState = {
    error: "",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer save reject", () => {
  const newState = reducer(initialState, actionSaveStateReject("Error"));
  const expectedState: TState = {
    error: "Error",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer restore confirm", () => {
  const newState = reducer(initialState, actionLoadStateConfirm());
  const expectedState: TState = {
    error: "",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer restore confirm", () => {
  const newState = reducer(initialState, actionLoadStateReject("Error"));
  const expectedState: TState = {
    error: "Error",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer unknown action", () => {
  const action: TActionUnknown = { type: STATE_LOAD_UNKNOWN };
  const newState = reducer(initialState, action);
  expect(newState).toEqual(initialState);
});
