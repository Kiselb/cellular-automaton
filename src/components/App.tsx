import React, { Component } from "react";

import { Size } from "../components/size/Size";
import { Velocity } from "../components/velocity/Velocity";
import { Button } from "../components/button/Button";
import { Panel } from "../components/panel/Panel";
import { CellParams } from "../components/cell/Cell";
import {
  CalcState,
  setXSize,
  setYSize,
  ClearState,
  FillRandom,
  SetCell,
} from "../components/Engine";
import {
  AutomatonDescription,
  AutomatonsList,
} from "./automaton/Automaton.types";
import { Automaton } from "./automaton/Automaton";
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
} from "./Defaults";

import "./App.css";

type TAppState = {
  epoch: number;
  data: number[][];
  rows: number;
  cols: number;
  factor: number;
  defrows: number;
  defcols: number;
  deffill: number;
  status: boolean; // false - paused, true - is running
  velocity: number;
  automaton: AutomatonDescription;
};
class App extends Component<unknown, TAppState> {
  timerID: NodeJS.Timer | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
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
      status: false,
      velocity: DEF_VELOCITY,
      automaton: AutomatonsList.filter(
        (automaton) => automaton.id === DEF_AUTOMATON
      )[0],
    };
  }
  onXSizeChange = (size: number) => {
    this.setState((prevState) => {
      const data = setXSize(prevState.data, size);
      return { cols: data[0].length, data: data };
    });
  };
  onYSizeChange = (size: number) => {
    this.setState((prevState) => {
      const data = setYSize(prevState.data, size);
      return { rows: data.length, data: data };
    });
  };
  tick = () => {
    this.setState((prevState) => {
      return {
        epoch: prevState.epoch + 1,
        data: CalcState(prevState.data, prevState.automaton),
      };
    });
  };
  run = () => {
    if (!this.state.status) {
      this.setState({ status: true });
      this.timerID = setInterval(() => this.tick(), this.state.velocity);
    }
  };
  mute = () => {
    this.setState({ status: false });
    !!this.timerID && clearInterval(this.timerID);
  };
  clear = () => {
    this.setState({
      epoch: 0,
      status: false,
      data: ClearState(this.state.data),
    });
  };
  fill = () => {
    this.setState({
      epoch: 0,
      data: FillRandom(this.state.data, this.state.factor),
    });
  };
  setFillFactor = (factor: number) => {
    this.setState({ factor: factor });
  };
  setVelocity = (velocity: number) => {
    !!this.timerID && clearInterval(this.timerID);
    this.setState({ velocity: velocity });
    this.timerID = setInterval(() => this.tick(), velocity);
  };
  setAutomaton = (automaton: AutomatonDescription) => {
    console.log(automaton);
    this.setState({ automaton: automaton });
  };
  cellEvent = (cell: CellParams) => {
    console.log(cell);
    this.setState((prevState) => {
      return { data: SetCell(prevState.data, cell.row, cell.col) };
    });
  };
  componentWillUnmount() {
    !!this.timerID && clearInterval(this.timerID);
  }
  render() {
    return (
      <div className="app">
        <div className="control">
          <div className="knob-label">Эпоха:</div>
          <div className="epoch">{this.state.epoch}</div>
          <div className="knob-label">Размер X:</div>
          <div>
            <Size
              onSizeChange={this.onXSizeChange}
              minSize={MIN_COLS}
              maxSize={MAX_COLS}
              defSize={DEF_COLS}
            />
          </div>
          <div className="knob-label">Размер Y:</div>
          <div>
            <Size
              onSizeChange={this.onYSizeChange}
              minSize={MIN_ROWS}
              maxSize={MAX_ROWS}
              defSize={DEF_ROWS}
            />
          </div>
          <div className="knob-label">Автомат:</div>
          <div>
            <Automaton
              defAutomaton={DEF_AUTOMATON}
              onAutomatonChange={this.setAutomaton}
            />
          </div>
          <div className="knob-label">Скорость:</div>
          <div>
            <Velocity
              onVelocityChange={this.setVelocity}
              defVelocity={DEF_VELOCITY}
            />
          </div>
          <div>
            <Button
              onAction={this.run}
              status={this.state.status}
              caption="Эволюция"
            />
          </div>
          <div>
            <Button
              onAction={this.mute}
              status={!this.state.status}
              caption="Остановить"
            />
          </div>
          <div>
            <Button onAction={this.clear} status={false} caption="Сбросить" />
          </div>
          <div className="knob-label">Заполнение:</div>
          <div>
            <Size
              onSizeChange={this.setFillFactor}
              minSize={MIN_FILL}
              maxSize={MAX_FILL}
              defSize={DEF_FILL}
            />
          </div>
          <div>
            <Button onAction={this.fill} status={false} caption="Заполнить" />
          </div>
        </div>
        <div className="lifecontainer">
          <Panel data={this.state.data} onChange={this.cellEvent} />
        </div>
      </div>
    );
  }
}

export default App;
