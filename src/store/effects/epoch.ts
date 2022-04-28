import { put, select } from "redux-saga/effects";

import { actionIncEpoch, actionResetEpoch } from "../ducks/epoch";
import { actionNextEpoch, actionClearFeild } from "../ducks/gamelife";
import { AutomatonDescription } from "../../components/automaton/types";
import { AppReduxState } from "../../store/ducks/reducer";

export const INC_EPOCH_SAGA = "INC_EPOCH_SAGA";
export const RESET_EPOCH_SAGA = "RESET_EPOCH_SAGA";

type SagaActionSetEpoch = {
  type: typeof INC_EPOCH_SAGA | typeof RESET_EPOCH_SAGA;
};
export const createSagaActionIncEpoch = (): SagaActionSetEpoch => ({
  type: INC_EPOCH_SAGA,
});
export const createSagaActionResetEpoch = (): SagaActionSetEpoch => ({
  type: RESET_EPOCH_SAGA,
});

export function* sagaIncEpoch() {
  const automaton: AutomatonDescription = yield select<
    (state: AppReduxState) => AutomatonDescription
  >((state) => {
    console.log(state);
    return state.automaton.value;
  });
  yield put(actionIncEpoch());
  yield put(actionNextEpoch(automaton));
}

export function* sagaResetEpoch() {
  yield put(actionResetEpoch());
  yield put(actionClearFeild());
}
