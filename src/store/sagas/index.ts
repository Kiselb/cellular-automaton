import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, takeEvery } from "redux-saga/effects";

import {
  STATE_SAVE_SAGA,
  STATE_RESTORE_SAGA,
  saveStateSaga,
  restoreStateSaga,
} from "./StateSaga";

import rootReducer from "../ducks/reducer";

export function* rootSaga() {
  yield all([
    takeEvery(STATE_SAVE_SAGA, saveStateSaga),
    takeEvery(STATE_RESTORE_SAGA, restoreStateSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
