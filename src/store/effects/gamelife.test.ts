import { expectSaga } from "redux-saga-test-plan";

import reducer, { actionFillField, actionClearFeild } from "../ducks/gamelife";
import { sagaClearField, sagaFillField } from "./gamelife";

it("Set Clear Field saga works", () => {
  return expectSaga(sagaClearField).put(actionClearFeild()).run();
});
it("Handles Clear Field reducer", () => {
  return expectSaga(sagaClearField).withReducer(reducer).run();
});
it("Set Fill Field saga works", () => {
  return expectSaga(sagaFillField)
    .withState({ factor: { value: 25 } })
    .put(actionFillField(25))
    .run();
});
it("Handles Fill Field reducer", () => {
  return expectSaga(sagaFillField)
    .withReducer(reducer)
    .withState({
      factor: { value: 25 },
      data: Array.from({ length: 50 }, () =>
        Array.from({ length: 50 }, () => 0)
      ),
    })
    .run();
});
