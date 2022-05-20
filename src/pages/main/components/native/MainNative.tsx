import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { HexColorPicker } from "react-colorful";

import {
  AutomatonDescription,
  AutomatonsList,
  Automaton,
} from "../../../../components/automaton/types";
import { Status } from "../../../../domain/types";
import { Size } from "../../../../components/size/types";
import { Velocity } from "../../../../components/velocity/types";
import { Button } from "../../../../components/button/types";
import { Panel } from "../../../../components/panel/types";
import { Params as CellParams } from "../../../../components/cell/types";
import {
  CalcState,
  setXSize,
  setYSize,
  ClearState,
  FillRandom,
  SetCell,
} from "../../../../domain/types";
import {
  MIN_ROWS,
  MAX_ROWS,
  DEF_ROWS,
  MIN_COLS,
  MAX_COLS,
  DEF_COLS,
  MIN_FILL,
  MAX_FILL,
  DEF_FILL,
  DEF_VELOCITY,
  DEF_AUTOMATON,
  DEF_MIN_COLOR,
  DEF_MAX_COLOR,
} from "../../../../domain/defaults";
import { authContext } from "../../../../services/auth/Auth";

import styles from "./main.module.css";

export type AppState = {
  epoch: number;
  data: number[][];
  rows: number;
  cols: number;
  factor: number;
  defrows: number;
  defcols: number;
  deffill: number;
  status: Status;
  velocity: number;
  automaton: AutomatonDescription;
  minColor: string;
  maxColor: string;
};

export const initialState: AppState = {
  epoch: 0,
  rows: DEF_ROWS,
  cols: DEF_COLS,
  factor: DEF_FILL,
  defrows: DEF_ROWS,
  defcols: DEF_COLS,
  deffill: DEF_FILL,
  data: Array.from({ length: DEF_ROWS }, () =>
    Array.from({ length: DEF_COLS }, () => 0)
  ),
  status: "stopped",
  velocity: DEF_VELOCITY,
  automaton: AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0],
  minColor: DEF_MIN_COLOR,
  maxColor: DEF_MAX_COLOR,
};

type MainProps = {
  onModeChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  probe?: ({}) => void;
};

export const Main = ({ probe, onModeChange }: MainProps) => {
  let timerId: number | null = null;

  const context = useContext(authContext);
  const [state, setState] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "playing") {
      timerId = window.setTimeout(tick, state.velocity);
    }
    return () => {
      !!timerId && window.clearTimeout(timerId);
    };
  }, [state.status, state.epoch]);

  const onXSizeChange = (size: number) => {
    !!probe && probe(size);
    setState((prevState) => {
      const data = setXSize(prevState.data, size);
      return { ...prevState, cols: data[0].length, data: data };
    });
  };
  const onYSizeChange = (size: number) => {
    !!probe && probe(size);
    setState((prevState) => {
      const data = setYSize(prevState.data, size);
      return { ...prevState, rows: data.length, data };
    });
  };
  const tick = () => {
    !!probe && probe({});
    setState((prevState) => ({
      ...prevState,
      epoch: prevState.epoch + 1,
      data: CalcState(prevState.data, prevState.automaton),
    }));
  };
  const run = () => {
    !!probe && probe({});
    if (state.status === "stopped") {
      setState((prevState) => ({
        ...prevState,
        status: "playing",
      }));
    }
  };
  const mute = () => {
    !!probe && probe({});
    setState((prevState) => ({
      ...prevState,
      status: "stopped",
    }));
  };
  const clear = () => {
    !!probe && probe({});
    setState((prevState) => ({
      ...prevState,
      epoch: 0,
      status: "stopped",
      data: ClearState(state.data),
    }));
  };
  const fill = () => {
    !!probe && probe({});
    setState((prevState) => ({
      ...prevState,
      epoch: 0,
      data: FillRandom(prevState.data, prevState.factor),
    }));
  };
  const setFillFactor = (factor: number) => {
    !!probe && probe(factor);
    setState((prevState) => ({
      ...prevState,
      factor: factor,
    }));
  };
  const setVelocity = (velocity: number) => {
    !!probe && probe(velocity);
    setState((prevState) => ({
      ...prevState,
      velocity: velocity,
    }));
  };
  const setAutomaton = (automaton: AutomatonDescription) => {
    !!probe && probe(automaton);
    setState((prevState) => ({
      ...prevState,
      automaton: automaton,
    }));
  };
  const cellEvent = (cell: CellParams) => {
    !!probe && probe(cell);
    setState((prevState) => ({
      ...prevState,
      data: SetCell(prevState.data, cell.row, cell.col),
    }));
  };
  const setMinColor = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const color = event.currentTarget.value;
    !!probe && probe({ color });
    setState((prevState) => ({
      ...prevState,
      minColor: color,
    }));
  };
  const setMaxColor = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const color = event.currentTarget.value;
    !!probe && probe({ color });
    setState((prevState) => ({
      ...prevState,
      maxColor: color,
    }));
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["header"]}>
        <select
          data-testid="changeMode"
          onChange={onModeChange}
          defaultValue="Native"
        >
          <option value="Native">Native</option>
          <option value="ReduxThunk">Redux (Thunk)</option>
          <option value="ReduxSaga">Redux (Saga)</option>
          <option value="ReduxEffects">Redux (Effects)</option>
        </select>
        <p>{!!context ? context.user : ""}</p>
        <button
          onClick={() => {
            !!context && context.logout(() => router.push("/"));
          }}
        >
          Выйти
        </button>
      </div>
      <div className={styles["control"]}>
        <div className={styles["knob-label"]}>Эпоха:</div>
        <div className={styles["epoch"]}>{state.epoch}</div>
        <div className={styles["knob-label"]}>Размер X:</div>
        <div>
          <Size
            onSizeChange={onXSizeChange}
            minSize={MIN_COLS}
            maxSize={MAX_COLS}
            defSize={DEF_COLS}
            testId="sizex"
          />
        </div>
        <div className={styles["knob-label"]}>Размер Y:</div>
        <div>
          <Size
            onSizeChange={onYSizeChange}
            minSize={MIN_ROWS}
            maxSize={MAX_ROWS}
            defSize={DEF_ROWS}
            testId="sizey"
          />
        </div>
        <div className={styles["knob-label"]}>Автомат:</div>
        <div>
          <Automaton
            defAutomaton={DEF_AUTOMATON}
            onAutomatonChange={setAutomaton}
          />
        </div>
        <div className={styles["knob-label"]}>Скорость:</div>
        <div>
          <Velocity onVelocityChange={setVelocity} defVelocity={DEF_VELOCITY} />
        </div>
        <div>
          <Button
            onAction={run}
            status={state.status === "playing"}
            caption="Эволюция"
            testId="actionrun"
          />
        </div>
        <div>
          <Button
            onAction={mute}
            status={state.status === "stopped"}
            caption="Остановить"
            testId="actionstop"
          />
        </div>
        <div>
          <Button
            onAction={clear}
            status={false}
            caption="Сбросить"
            testId="actionclear"
          />
        </div>
        <div className={styles["knob-label"]}>Заполнение:</div>
        <div>
          <Size
            onSizeChange={setFillFactor}
            minSize={MIN_FILL}
            maxSize={MAX_FILL}
            defSize={DEF_FILL}
            testId="fillfactor"
          />
        </div>
        <div>
          <Button
            onAction={fill}
            status={false}
            caption="Заполнить"
            testId="actionfill"
          />
        </div>
        <div className={styles["knob-label"]}>Младший:</div>
        <div>
          <input
            data-testid="mincolor"
            className={styles["color-picker"]}
            type="color"
            defaultValue={state.minColor}
            onChange={setMinColor}
          />
        </div>
        <div className={styles["knob-label"]}>Старший:</div>
        <div>
          <input
            data-testid="maxcolor"
            className={styles["color-picker"]}
            type="color"
            defaultValue={state.maxColor}
            onChange={setMaxColor}
          />
        </div>
      </div>
      <div className={styles["lifecontainer"]}>
        <Panel
          data={state.data}
          minColor={state.minColor}
          maxColor={state.maxColor}
          onChange={cellEvent}
        />
      </div>
    </div>
  );
};
