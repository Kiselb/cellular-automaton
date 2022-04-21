import reducer, {
  State,
  initialState,
  STATE_LOAD_UNKNOWN,
  ActionUnknown,
  actionSaveStateConfirm,
  actionSaveStateReject,
  actionLoadStateConfirm,
  actionLoadStateReject,
} from "./state";

it("State reducer initial state", () => {
  const action: ActionUnknown = { type: STATE_LOAD_UNKNOWN };
  const newState = reducer(undefined, action);
  expect(newState).toEqual(initialState);
});
it("State reducer save confirm", () => {
  const newState = reducer(initialState, actionSaveStateConfirm());
  const expectedState: State = {
    error: "",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer save reject", () => {
  const newState = reducer(initialState, actionSaveStateReject("Error"));
  const expectedState: State = {
    error: "Error",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer restore confirm", () => {
  const newState = reducer(initialState, actionLoadStateConfirm());
  const expectedState: State = {
    error: "",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer restore confirm", () => {
  const newState = reducer(initialState, actionLoadStateReject("Error"));
  const expectedState: State = {
    error: "Error",
  };
  expect(newState).toEqual(expectedState);
});
it("State reducer unknown action", () => {
  const action: ActionUnknown = { type: STATE_LOAD_UNKNOWN };
  const newState = reducer(initialState, action);
  expect(newState).toEqual(initialState);
});
