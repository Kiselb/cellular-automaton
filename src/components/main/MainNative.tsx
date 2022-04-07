import React, { Component, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Size } from "../size/Size";
import { Velocity } from "../velocity/Velocity";
import { Button } from "../button/Button";
import { Panel } from "../panel/Panel";
import { CellParams } from "../cell/Cell";
import {
  CalcState,
  setXSize,
  setYSize,
  ClearState,
  FillRandom,
  SetCell,
} from "../Engine";
import {
  AutomatonDescription,
  AutomatonsList,
} from "../automaton/Automaton.types";
import { Automaton } from "../automaton/Automaton";
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
} from "../Defaults";
import { authContext } from "../Auth";
import { TMode, TMainProps } from "./Main";

import "./Main.css";

export type TStatus = "stopped" | "playing";
export type TAppState = {
  epoch: number;
  data: number[][];
  rows: number;
  cols: number;
  factor: number;
  defrows: number;
  defcols: number;
  deffill: number;
  status: TStatus;
  velocity: number;
  automaton: AutomatonDescription;
};

export const initialState: TAppState = {
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
};

export const Main = ({ probe, onSelectMode }: TMainProps) => {
  const context = useContext(authContext);
  const [state, setState] = useState(initialState);

  const navigate = useNavigate();
  let timerID: number | null = null;

  useEffect(() => {
    if (state.status === "playing") {
      timerID = window.setInterval(() => tick(), state.velocity);
    } else {
      !!timerID && window.clearInterval(timerID);
    }
    return () => {
      !!timerID && window.clearInterval(timerID);
    };
  }, [state.status, state.velocity]);
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

  return (
    <div className="app">
      <div className="header">
        <select onChange={onSelectMode} defaultValue="Native">
          <option value="Native">Native</option>
          <option value="Redux">Redux</option>
        </select>
        <p>{context!.user}</p>
        <button
          onClick={() => {
            context!.logout(() => navigate("/login", { replace: true }));
          }}
        >
          Выйти
        </button>
      </div>
      <div className="control">
        <div className="knob-label">Эпоха:</div>
        <div className="epoch">{state.epoch}</div>
        <div className="knob-label">Размер X:</div>
        <div>
          <Size
            onSizeChange={onXSizeChange}
            minSize={MIN_COLS}
            maxSize={MAX_COLS}
            defSize={DEF_COLS}
            testId="sizex"
          />
        </div>
        <div className="knob-label">Размер Y:</div>
        <div>
          <Size
            onSizeChange={onYSizeChange}
            minSize={MIN_ROWS}
            maxSize={MAX_ROWS}
            defSize={DEF_ROWS}
            testId="sizey"
          />
        </div>
        <div className="knob-label">Автомат:</div>
        <div>
          <Automaton
            defAutomaton={DEF_AUTOMATON}
            onAutomatonChange={setAutomaton}
          />
        </div>
        <div className="knob-label">Скорость:</div>
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
        <div className="knob-label">Заполнение:</div>
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
      </div>
      <div className="lifecontainer">
        <Panel data={state.data} onChange={cellEvent} />
      </div>
    </div>
  );
};
