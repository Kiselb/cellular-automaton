import { expectSaga } from "redux-saga-test-plan";
import { all, takeEvery } from "redux-saga/effects";

import { rootSaga } from "./index";

import { SET_AUTOMATON_SAGA, sagaSetAutomaton } from "./automaton";
import {
  INC_EPOCH_SAGA,
  RESET_EPOCH_SAGA,
  sagaIncEpoch,
  sagaResetEpoch,
} from "./epoch";
import { SET_FILL_FACTOR_SAGA, sagaSetFactor } from "./factor";
import {
  CLEAR_FIELD_SAGA,
  FILL_FIELD_SAGA,
  sagaClearField,
  sagaFillField,
} from "./gamelife";
import {
  SET_SIZE_X_SAGA,
  SET_SIZE_Y_SAGA,
  sagaSetSizeX,
  sagaSetSizeY,
} from "./sizes";
import { SET_VELOCITY_SAGA, sagaSetVelocity } from "./velocity";
import {
  STATE_SAVE_SAGA,
  STATE_RESTORE_SAGA,
  saveStateSaga,
  restoreStateSaga,
} from "../sagas/StateSaga";

it("Root saga works", () => {
  expectSaga.DEFAULT_TIMEOUT = 500;
  return expectSaga(rootSaga)
    .provide({
      all: () => null,
    })
    .run();
});
it("Root Saga Takes", () => {
  const saga = rootSaga();
  expect(saga.next().value).toEqual(
    all([
      takeEvery(SET_AUTOMATON_SAGA, sagaSetAutomaton),
      takeEvery(INC_EPOCH_SAGA, sagaIncEpoch),
      takeEvery(RESET_EPOCH_SAGA, sagaResetEpoch),
      takeEvery(SET_FILL_FACTOR_SAGA, sagaSetFactor),
      takeEvery(CLEAR_FIELD_SAGA, sagaClearField),
      takeEvery(FILL_FIELD_SAGA, sagaFillField),
      takeEvery(SET_SIZE_X_SAGA, sagaSetSizeX),
      takeEvery(SET_SIZE_Y_SAGA, sagaSetSizeY),
      takeEvery(SET_VELOCITY_SAGA, sagaSetVelocity),
      takeEvery(STATE_SAVE_SAGA, saveStateSaga),
      takeEvery(STATE_RESTORE_SAGA, restoreStateSaga),
    ])
  );
});
