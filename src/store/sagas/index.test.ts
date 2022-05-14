import { expectSaga } from "redux-saga-test-plan";
import { all, takeEvery } from "redux-saga/effects";

import { rootSaga } from "./index";

import {
  STATE_SAVE_SAGA,
  STATE_RESTORE_SAGA,
  saveStateSaga,
  restoreStateSaga,
} from "./StateSaga";

it("Root saga works", () => {
  return expectSaga(rootSaga).run();
});
it("Root Saga Takes", () => {
  const saga = rootSaga();
  expect(saga.next().value).toEqual(
    all([
      takeEvery(STATE_SAVE_SAGA, saveStateSaga),
      takeEvery(STATE_RESTORE_SAGA, restoreStateSaga),
    ])
  );
});
