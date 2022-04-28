import { expectSaga } from "redux-saga-test-plan";

import reducer, { actionSetSizeX, actionSetSizeY } from "../ducks/gamelife";
import {
  createSagaActionSetSizeX,
  createSagaActionSetSizeY,
  sagaSetSizeX,
  sagaSetSizeY,
} from "./sizes";

it("Set Size X saga works", () => {
  return expectSaga(sagaSetSizeX, createSagaActionSetSizeX(55))
    .put(actionSetSizeX(55))
    .run();
});
it("Handles Size X reducer", () => {
  return expectSaga(sagaSetSizeX, createSagaActionSetSizeX(55))
    .withReducer(reducer)
    .run();
});
it("Set Size Y saga works", () => {
  return expectSaga(sagaSetSizeY, createSagaActionSetSizeY(55))
    .put(actionSetSizeY(55))
    .run();
});
it("Handles Size Y reducer", () => {
  return expectSaga(sagaSetSizeY, createSagaActionSetSizeY(55))
    .withReducer(reducer)
    .run();
});
