import reducer, {
  State,
  initialState,
  actionSetVelocity,
  SET_VELOCITY_UNKNOWN,
  ActionVelocity,
} from "./velocity";

it("Epoch reducer initial state", () => {
  const action: ActionVelocity = { type: SET_VELOCITY_UNKNOWN, value: 100 };
  const newState = reducer(undefined, action);
  expect(newState).toEqual(initialState);
});
it("Epoch reducer values", () => {
  const newState = reducer(initialState, actionSetVelocity(1000));
  const expectedState: State = {
    value: 1000,
  };
  expect(newState).toEqual(expectedState);
});
it("Epoch reducer unknown action", () => {
  const action: ActionVelocity = { type: SET_VELOCITY_UNKNOWN, value: 100 };
  const newState = reducer(initialState, action);
  expect(newState).toEqual(initialState);
});
