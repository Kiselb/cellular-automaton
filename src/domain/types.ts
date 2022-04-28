export type LocalityTypes = "Neumann" | "Moore";
export type LocalityIndexes = {
  ur: number;
  uc: number;
  rr: number;
  rc: number;
  dr: number;
  dc: number;
  lr: number;
  lc: number;
};
export type Status = "stopped" | "playing";

export type AppStoreMode =
  | "Native"
  | "ReduxThunk"
  | "ReduxSaga"
  | "ReduxEffects";
export type ButtonCaption =
  | "Эволюция"
  | "Остановить"
  | "Заполнить"
  | "Сбросить"
  | "Сохранить"
  | "Восстановить";

export {
  CalcIndexes,
  CalcState,
  setXSize,
  setYSize,
  ClearState,
  FillRandom,
  SetCell,
} from "./engine";
