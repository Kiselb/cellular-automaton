import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, takeEvery } from "redux-saga/effects";

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

import rootReducer from "../ducks/reducer";

export function* rootSaga() {
  yield all([
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
  ]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { createSagaSetAutomaton } from "./automaton";
export { createSagaActionIncEpoch, createSagaActionResetEpoch } from "./epoch";
export { createSagaSetFactor } from "./factor";
export { createSagaClearField, createSagaFillField } from "./gamelife";
export { createSagaActionSetSizeX, createSagaActionSetSizeY } from "./sizes";
export { createSagaSetVelocity } from "./velocity";

export default store;
