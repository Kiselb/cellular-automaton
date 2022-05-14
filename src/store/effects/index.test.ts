import { expectSaga } from "redux-saga-test-plan";

import { rootSaga } from "./index";

it("Root saga works", () => {
  return expectSaga(rootSaga).run();
});
