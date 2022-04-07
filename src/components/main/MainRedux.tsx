import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  actionNextEpoch,
  actionClearFeild,
  actionFillField,
  actionSetSizeX,
  actionSetSizeY,
  actionToggleCell,
} from "../ducks/gamelife";
import { actionSetAutomaton } from "../ducks/automaton";
import { actionResetEpoch, actionIncEpoch } from "../ducks/epoch";
import { actionSetFactor } from "../ducks/factor";
import { actionSetStatus } from "../ducks/status";
import { actionSetVelocity } from "../ducks/velocity";
import { actionSaveState, actionLoadState } from "../ducks/state";
import { TAppReduxState } from "../ducks/reducer";

import { Size } from "../size/Size";
import { Velocity } from "../velocity/Velocity";
import { Button } from "../button/Button";
import { Panel } from "../panel/Panel";
import { CellParams } from "../cell/Cell";

import { AutomatonDescription } from "../automaton/Automaton.types";
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
import { TStatus } from "./MainNative";
import { TMainProps } from "./Main";

import "./Main.css";

export const Main = ({ probe, onSelectMode }: TMainProps) => {
  const context = useContext(authContext);
  const [ticks, setTicks] = useState(0);

  const automaton = useSelector<TAppReduxState, AutomatonDescription>(
    (state) => state.automaton.value
  );
  const status = useSelector<TAppReduxState, TStatus>(
    (state) => state.status.value
  );
  const velocity = useSelector<TAppReduxState, number>(
    (state) => state.velocity.value
  );
  const factor = useSelector<TAppReduxState, number>(
    (state) => state.factor.value
  );
  const epoch = useSelector<TAppReduxState, number>(
    (state) => state.epoch.value
  );
  const data = useSelector<TAppReduxState, number[][]>(
    (state) => state.gameLife.data
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let timerID: number | null = null;

  useEffect(() => {
    if (status === "playing") {
      timerID = window.setInterval(() => tick(), velocity);
    } else {
      !!timerID && window.clearInterval(timerID);
      setTicks(0);
    }
    return () => {
      !!timerID && window.clearInterval(timerID);
    };
  }, [ticks, status, velocity]);
  const onXSizeChange = (size: number) => {
    !!probe && probe(size);
    dispatch(actionSetSizeX(size));
  };
  const onYSizeChange = (size: number) => {
    !!probe && probe(size);
    dispatch(actionSetSizeY(size));
  };
  const tick = () => {
    !!probe && probe({});
    dispatch(actionIncEpoch());
    dispatch(actionNextEpoch(automaton));
    setTicks((ticks) => ticks + 1);
  };
  const run = () => {
    !!probe && probe({});
    dispatch(actionSetStatus("playing"));
  };
  const mute = () => {
    !!probe && probe({});
    dispatch(actionSetStatus("stopped"));
  };
  const clear = () => {
    !!probe && probe({});
    dispatch(actionSetStatus("stopped"));
    dispatch(actionClearFeild());
    dispatch(actionResetEpoch());
  };
  const fill = () => {
    !!probe && probe({});
    dispatch(actionFillField(factor));
    dispatch(actionResetEpoch());
  };
  const setFillFactor = (factor: number) => {
    !!probe && probe(factor);
    dispatch(actionSetFactor(factor));
  };
  const setVelocity = (velocity: number) => {
    !!probe && probe(velocity);
    dispatch(actionSetVelocity(velocity));
  };
  const setAutomaton = (automaton: AutomatonDescription) => {
    !!probe && probe(automaton);
    dispatch(actionSetAutomaton(automaton));
  };
  const cellEvent = (cell: CellParams) => {
    !!probe && probe(cell);
    dispatch(actionToggleCell(cell.row, cell.col));
  };
  const saveState = () => {
    !!probe && probe({});
    dispatch(actionSaveState());
  };
  const restoreState = () => {
    !!probe && probe({});
    dispatch(actionLoadState());
  };

  return (
    <div className="app">
      <div className="header">
        <select onChange={onSelectMode} defaultValue="Redux">
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
        <div className="epoch">{epoch}</div>
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
            status={status === "playing"}
            caption="Эволюция"
            testId="actionrun"
          />
        </div>
        <div>
          <Button
            onAction={mute}
            status={status === "stopped"}
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
        <div>
          <Button
            onAction={saveState}
            status={false}
            caption="Сохранить"
            testId="actionSave"
          />
        </div>
        <div>
          <Button
            onAction={restoreState}
            status={false}
            caption="Восстановить"
            testId="actionRestore"
          />
        </div>
      </div>
      <div className="lifecontainer">
        <Panel data={data} onChange={cellEvent} />
      </div>
    </div>
  );
};
