import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";

import {
  actionSagaSaveState,
  actionSagaRestoreState,
  saveStateSaga,
  restoreStateSaga,
  saveState,
  restoreState,
  STATE_SAVE_SAGA,
  STATE_RESTORE_SAGA,
  LOCAL_STORAGE_KEY,
} from "./StateSaga";
import {
  actionSaveStateConfirm,
  actionSaveStateReject,
  actionLoadStateConfirm,
  actionLoadStateReject,
} from "../ducks/state";
import { AppReduxState } from "../ducks/reducer";
import { AutomatonsList } from "../../components/automaton/types";
import {
  DEF_AUTOMATON,
  DEF_FILL,
  DEF_ROWS,
  DEF_COLS,
  DEF_VELOCITY,
} from "../../domain/defaults";
import { throwError } from "redux-saga-test-plan/providers";

const state: AppReduxState = {
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

it("Sagas naming convention", () => {
  expect(STATE_SAVE_SAGA).toMatch(/STATE_SAVE_SAGA/);
  expect(STATE_RESTORE_SAGA).toMatch(/STATE_RESTORE_SAGA/);
  expect(LOCAL_STORAGE_KEY).toMatch(/cellular-automaton.state/);
});
it("Sagas Requests action objects", () => {
  expect(actionSagaSaveState(state)).toEqual({
    type: STATE_SAVE_SAGA,
    state: state,
  });
  expect(actionSagaRestoreState()).toEqual({ type: STATE_RESTORE_SAGA });
});
it("Save state saga works", () => {
  expectSaga(saveStateSaga, actionSagaSaveState(state))
    .put(actionSaveStateConfirm())
    .run();
});
it("Restore state saga works", () => {
  expectSaga(restoreStateSaga).put(actionLoadStateConfirm()).run();
});
it("Save reject state saga works", () => {
  expectSaga(saveStateSaga, actionSagaSaveState(state))
    .provide([[call(() => null), throwError(new Error("Save Error"))]])
    .put(actionSaveStateReject("Test reject save state"))
    .run();
}); //*
it("Restore reject state saga works", () => {
  expectSaga(restoreStateSaga)
    .provide([[call(() => null), throwError(new Error("Restore Error"))]])
    .put(actionLoadStateReject("Test reject restore state"))
    .run();
}); //*
it("Save state saga api call", () => {
  const iterator = saveStateSaga(actionSagaSaveState(state));
  const apiCall = call(saveState, state);
  expect(iterator.next().value).toEqual(apiCall);
});
it("Save state saga api call correctly", () => {
  const iterator = saveStateSaga(actionSagaSaveState(state));
  const apiCall = call(saveState, state);
  expect(iterator.next().value).toEqual(apiCall);
  iterator.next();
  expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "")).toEqual(
    state
  );
});
it("Restore state saga api call", () => {
  const iterator = restoreStateSaga();
  const apiCall = call(restoreState);
  expect(iterator.next().value).toEqual(apiCall);
});
it("Restore state saga api call correctly", () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  expectSaga(restoreStateSaga).call(restoreState).run();
}); //
it("Save state saga api throw", () => {
  const message = "Test save state error";
  const iterator = saveStateSaga(actionSagaSaveState(state));
  const error = new Error(message);
  iterator.next();
  expect(iterator.throw(error).value).toEqual(
    put(actionSaveStateReject(message))
  );
});
it("Save state saga api throw custom message", () => {
  const iterator = saveStateSaga(actionSagaSaveState(state));
  iterator.next();
  expect(iterator.throw("Error").value).toEqual(
    put(actionSaveStateReject("Local storage write error"))
  );
}); // **
it("Restore state saga api throw", () => {
  const message = "Test restore state error";
  const iterator = restoreStateSaga();
  const error = new Error(message);
  iterator.next();
  expect(iterator.throw(error).value).toEqual(
    put(actionLoadStateReject(message))
  );
});
it("Restore state saga api throw custom message", () => {
  const iterator = restoreStateSaga();
  iterator.next();
  expect(iterator.throw("Error").value).toEqual(
    put(actionLoadStateReject("Restore state from Local storage error"))
  );
});
it("Restore state saga api localstorage empty", () => {
  expectSaga(restoreStateSaga)
    .provide([[matchers.call.fn(restoreState), ""]])
    .put(actionLoadStateReject("Test reject restore state"))
    .run();
});
