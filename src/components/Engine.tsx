import { AutomatonDescription } from "../components/automaton/automaton";

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
export const CalcIndexes = (
  state: number[][],
  row: number,
  col: number
): LocalityIndexes => {
  const ur: number = row === 0 ? state.length - 1 : row - 1;
  const uc: number = col;

  const rr: number = row;
  const rc: number = col === state[row].length - 1 ? 0 : col + 1;

  const dr: number = row === state.length - 1 ? 0 : row + 1;
  const dc: number = col;

  const lr: number = row;
  const lc: number = col === 0 ? state[row].length - 1 : col - 1;

  return {
    ur: ur,
    uc: uc,
    rr: rr,
    rc: rc,
    dr: dr,
    dc: dc,
    lr: lr,
    lc: lc,
  };
};
export const CalcLocality = (
  state: number[][],
  row: number,
  col: number
): number => {
  const indexes = CalcIndexes(state, row, col);
  const locality: number = [
    state[indexes.ur][indexes.uc],
    state[indexes.rr][indexes.rc],
    state[indexes.dr][indexes.dc],
    state[indexes.lr][indexes.lc],

    state[indexes.ur][indexes.lc],
    state[indexes.ur][indexes.rc],
    state[indexes.dr][indexes.rc],
    state[indexes.dr][indexes.lc],
  ].reduce((acc, item) => acc + (item === 0 ? 0 : 1), 0);
  return locality;
};
export const CalcState = (
  state: number[][],
  automaton: AutomatonDescription
): number[][] => {
  const newState: number[][] = [];
  for (let i = 0; i < state.length; i++) {
    newState.push(state[i].slice());
  }
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      const locality = CalcLocality(state, i, j);
      if (state[i][j] === 0) {
        if (automaton.born[locality] === 1) {
          newState[i][j] = 1;
        }
      } else {
        if (automaton.save[locality] === 1) {
          newState[i][j] = state[i][j] + 1;
        } else {
          newState[i][j] = 0;
        }
      }
    }
  }
  return newState;
};
