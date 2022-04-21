import { combineReducers } from "redux";

import automatonReducer from "./automaton";
import epochReducer from "./epoch";
import factorReducer from "./factor";
import gameLifeReducer from "./gamelife";
import statusReducer from "./status";
import velocityReducer from "./velocity";
import stateReducer from "./state";

import { State as AutomatonState } from "./automaton";
import { State as EpochState } from "./epoch";
import { State as FactorState } from "./factor";
import { State as GameLifeState } from "./gamelife";
import { State as StatusState } from "./status";
import { State as VelocityState } from "./velocity";
import { State as StateState } from "./state";

export type AppReduxState = {
  automaton: AutomatonState;
  epoch: EpochState;
  factor: FactorState;
  gameLife: GameLifeState;
  status: StatusState;
  velocity: VelocityState;
  state: StateState;
};

const rootReducer = combineReducers<AppReduxState>({
  automaton: automatonReducer,
  epoch: epochReducer,
  factor: factorReducer,
  gameLife: gameLifeReducer,
  status: statusReducer,
  velocity: velocityReducer,
  state: stateReducer,
});

export default rootReducer;
