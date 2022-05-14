import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { ThunkDispatch } from "redux-thunk";

import rootReducer from "./reducer";

import reducer, {
  State,
  initialState,
  ActionUnknown,
  actionSaveState,
  actionLoadState,
  actionSaveStateConfirm,
  actionSaveStateReject,
  actionLoadStateConfirm,
  actionLoadStateReject,
  LOCAL_STORAGE_KEY,
  STATE_SAVE_CONFIRM,
  STATE_SAVE_REJECT,
  STATE_LOAD_CONFIRM,
  STATE_LOAD_REJECT,
  STATE_LOAD_UNKNOWN,
  thunkSaveState,
} from "./state";
import {
  DEF_AUTOMATON,
  DEF_FILL,
  DEF_ROWS,
  DEF_COLS,
  DEF_VELOCITY,
} from "../../domain/defaults";

import { AutomatonsList } from "../../components/automaton/types";
import storeThunk from "../../store/ducks/store";

import { AppReduxState } from "./reducer";
import { ActionSizeX, ActionSizeY, ActionFieldLoad } from "./gamelife";
import { ActionAutomaton } from "./automaton";
import { ActionEpoch } from "./epoch";
import { ActionFactor } from "./factor";
import { ActionStatus } from "./status";
import { ActionVelocity } from "./velocity";
import { AnyAction } from "redux";
import { resolveConfig } from "prettier";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const testState: AppReduxState = {
  automaton: {
    value: AutomatonsList.filter(
      (automaton) => automaton.id === DEF_AUTOMATON
    )[0],
  },
  epoch: {
    value: 0,
  },
  factor: {
    value: DEF_FILL,
  },
  gameLife: {
    data: Array.from({ length: DEF_ROWS }, () =>
      Array.from({ length: DEF_COLS }, () => 1)
    ),
    rows: DEF_ROWS,
    cols: DEF_COLS,
  },
  status: {
    value: "stopped",
  },
  velocity: {
    value: DEF_VELOCITY,
  },
  state: {
    error: "",
  },
};

it("Epoch actions naming convention", () => {
  expect(STATE_SAVE_CONFIRM).toMatch(/cellular-automaton\/state\/save\//);
  expect(STATE_SAVE_REJECT).toMatch(/cellular-automaton\/state\/save\//);
  expect(STATE_LOAD_CONFIRM).toMatch(/cellular-automaton\/state\/load\//);
  expect(STATE_LOAD_REJECT).toMatch(/cellular-automaton\/state\/load\//);
  expect(STATE_LOAD_UNKNOWN).toMatch(/cellular-automaton\/state\/load\//);
});
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
it("Thunk load state", async () => {
  await localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(testState));
  const store = mockStore(testState);
  return store.dispatch<any>(actionLoadState()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "cellular-automaton/state/load/confirm",
    });
    expect(actions[1]).toEqual({
      type: "cellular-automaton/status/set",
      status: "stopped",
    });
    expect(actions[2].type).toEqual("cellular-automaton/automaton/set");
    expect(actions[3]).toEqual({ type: "cellular-automaton/epoch/reset" });
    expect(actions[4]).toEqual({
      type: "cellular-automaton/factor/set",
      factor: 25,
    });
    expect(actions[5]).toEqual({
      type: "cellular-automaton/velocity/set",
      value: 100,
    });
    expect(actions[6]).toEqual({
      type: "cellular-automaton/sizex/set",
      size: 50,
    });
    expect(actions[7]).toEqual({
      type: "cellular-automaton/sizey/set",
      size: 50,
    });
    expect(actions[8].type).toEqual("cellular-automaton/field/load");
  });
});
it("Thunk save state", async () => {
  await localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(""));
  const store = mockStore(testState);
  return store.dispatch<any>(actionSaveState()).then(async () => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "cellular-automaton/state/save/confirm",
    });
    const data = await JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || ""
    );
    expect(data).toEqual(testState);
  });
});
