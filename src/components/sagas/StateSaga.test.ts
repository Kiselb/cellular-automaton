import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import {
  actionSagaSaveState,
  saveStateSaga,
  actionSagaRestoreState,
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
import { TAppReduxState } from "../ducks/reducer";
import { AutomatonsList } from "../automaton/Automaton.types";
import {
  DEF_AUTOMATON,
  DEF_FILL,
  DEF_ROWS,
  DEF_COLS,
  DEF_VELOCITY,
} from "../Defaults";

const state: TAppReduxState = {
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
