import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  actionNextEpoch,
  actionClearFeild,
  actionFillField,
  actionSetSizeX,
  actionSetSizeY,
  actionToggleCell,
} from "../../../../store/ducks/gamelife";
import { actionSetAutomaton } from "../../../../store/ducks/automaton";
import {
  actionResetEpoch,
  actionIncEpoch,
} from "../../../../store/ducks/epoch";
import { actionSetFactor } from "../../../../store/ducks/factor";
import { actionSetStatus } from "../../../../store/ducks/status";
import { actionSetVelocity } from "../../../../store/ducks/velocity";
import {
  actionSaveState,
  actionLoadState,
} from "../../../../store/ducks/state";
import { AppReduxState } from "../../../..//store/ducks/reducer";

import {
  actionSagaSaveState,
  actionSagaRestoreState,
} from "../../../../store/sagas/StateSaga";

import { Size } from "../../../../components/size/types";
import { Velocity } from "../../../../components/velocity/types";
import { Button } from "../../../../components/button/types";
import { Panel } from "../../../../components/panel/types";
import { Params as CellParams } from "../../../../components/cell/types";

import { AutomatonDescription } from "../../../../components/automaton/types";
import { Automaton } from "../../../../components/automaton/types";
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
} from "../../../../domain/defaults";
import { authContext } from "../../../../services/auth/Auth";
import { Status } from "../../../../domain/types";

import styles from "./main.module.css";

type MainProps = {
  onModeChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  useSaga: boolean;
  probe?: ({}) => void;
};

export const Main = ({ probe, onModeChange, useSaga }: MainProps) => {
  const context = useContext(authContext);
  const [ticks, setTicks] = useState(0);

  const automaton = useSelector<AppReduxState, AutomatonDescription>(
    (state) => state.automaton.value
  );
  const status = useSelector<AppReduxState, Status>(
    (state) => state.status.value
  );
  const velocity = useSelector<AppReduxState, number>(
    (state) => state.velocity.value
  );
  const factor = useSelector<AppReduxState, number>(
    (state) => state.factor.value
  );
  const epoch = useSelector<AppReduxState, number>(
    (state) => state.epoch.value
  );
  const data = useSelector<AppReduxState, number[][]>(
    (state) => state.gameLife.data
  );
  const state = useSelector<AppReduxState, AppReduxState>((state) => state);
  const dispatch = useDispatch();

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
    if (useSaga) {
      dispatch(actionSagaSaveState(state));
    } else {
      dispatch(actionSaveState());
    }
  };
  const restoreState = () => {
    !!probe && probe({});
    if (useSaga) {
      dispatch(actionSagaRestoreState());
    } else {
      dispatch(actionLoadState());
    }
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["header"]}>
        <select
          data-testid="changeMode"
          onChange={onModeChange}
          defaultValue="ReduxThunk"
        >
          <option value="Native">Native</option>
          <option value="ReduxThunk">Redux (Thunk)</option>
          <option value="ReduxSaga">Redux (Saga)</option>
          <option value="ReduxEffects">Redux (Effects)</option>
        </select>
        <p>{!!context ? context.user : ""}</p>
        {/* <button
          onClick={() => {
            !!context &&
              context.logout(() => navigate("/login", { replace: true }));
          }}
        >
          Выйти
        </button> */}
      </div>
      <div className={styles["control"]}>
        <div className={styles["knob-label"]}>Эпоха:</div>
        <div className={styles["epoch"]}>{epoch}</div>
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
      <div className={styles["lifecontainer"]}>
        <Panel data={data} onChange={cellEvent} />
      </div>
    </div>
  );
};
