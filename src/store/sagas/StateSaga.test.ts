import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import {
  actionSagaSaveState,
  saveStateSaga,
  restoreStateSaga,
  saveState,
  restoreState,
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
    .put(actionSaveStateReject("Test reject save state"))
    .run();
});
it("Restore reject state saga works", () => {
  expectSaga(restoreStateSaga)
    .put(actionLoadStateReject("Test reject restore state"))
    .run();
});
it("Save state saga api call", () => {
  const iterator = saveStateSaga(actionSagaSaveState(state));
  const apiCall = call(saveState, state);
  expect(iterator.next().value).toEqual(apiCall);
});
it("Restore state saga api call", () => {
  const iterator = restoreStateSaga();
  const apiCall = call(restoreState);
  expect(iterator.next().value).toEqual(apiCall);
});
it("Save state saga api throw", () => {
  const message = "Test save state error";
  const iterator = saveStateSaga(actionSagaSaveState(state));
  const error = new Error(message);
  iterator.next();
  expect(iterator.throw(error).value).toEqual(
    put(actionSaveStateReject(message))
  );
});
it("Restore state saga api throw", () => {
  const message = "Test restore state error";
  const iterator = restoreStateSaga();
  const error = new Error(message);
  iterator.next();
  expect(iterator.throw(error).value).toEqual(
    put(actionLoadStateReject(message))
  );
});
