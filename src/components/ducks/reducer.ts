import { combineReducers } from "redux";

import automatonReducer from "./automaton";
import epochReducer from "./epoch";
import factorReducer from "./factor";
import gameLifeReducer from "./gamelife";
import statusReducer from "./status";
import velocityReducer from "./velocity";
import stateReducer from "./state";

import { TState as TAutomatonState } from "./automaton";
import { TState as TEpochState } from "./epoch";
import { TState as TFactorState } from "./factor";
import { TState as TGameLifeState } from "./gamelife";
import { TState as TStatusState } from "./status";
import { TState as TVelocityState } from "./velocity";
import { TState as TStateState } from "./state";

export type TAppReduxState = {
  automaton: TAutomatonState;
  epoch: TEpochState;
  factor: TFactorState;
  gameLife: TGameLifeState;
  status: TStatusState;
  velocity: TVelocityState;
  state: TStateState;
};

const rootReducer = combineReducers<TAppReduxState>({
  automaton: automatonReducer,
  epoch: epochReducer,
  factor: factorReducer,
  gameLife: gameLifeReducer,
  status: statusReducer,
  velocity: velocityReducer,
  state: stateReducer,
});

export default rootReducer;
