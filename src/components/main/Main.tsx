import React, { Component } from "react";

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

import "./Main.css";

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
type TMainProps = {
  user: string;
  onSignedOut: () => void;
  probe?: ({}) => void;
};
export default class Main extends Component<TMainProps, TAppState> {
  timerID: number | null = null;

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
    !!this.props.probe && this.props.probe(size);
    this.setState((prevState) => {
      const data = setXSize(prevState.data, size);
      return { cols: data[0].length, data: data };
    });
  };
  onYSizeChange = (size: number) => {
    !!this.props.probe && this.props.probe(size);
    this.setState((prevState) => {
      const data = setYSize(prevState.data, size);
      return { rows: data.length, data };
    });
  };
  tick = () => {
    !!this.props.probe && this.props.probe({});
    this.setState((prevState) => ({
      epoch: prevState.epoch + 1,
      data: CalcState(prevState.data, prevState.automaton),
    }));
  };
  run = () => {
    !!this.props.probe && this.props.probe({});
    if (!this.state.status) {
      this.setState({ status: true });
      this.timerID = window.setInterval(() => this.tick(), this.state.velocity);
    }
  };
  mute = () => {
    !!this.props.probe && this.props.probe({});
    this.setState({ status: false });
    !!this.timerID && window.clearInterval(this.timerID);
  };
  clear = () => {
    !!this.props.probe && this.props.probe({});
    this.setState({
      epoch: 0,
      status: false,
      data: ClearState(this.state.data),
    });
  };
  fill = () => {
    !!this.props.probe && this.props.probe({});
    this.setState({
      epoch: 0,
      data: FillRandom(this.state.data, this.state.factor),
    });
  };
  setFillFactor = (factor: number) => {
    !!this.props.probe && this.props.probe(factor);
    this.setState({ factor: factor });
  };
  setVelocity = (velocity: number) => {
    !!this.props.probe && this.props.probe(velocity);
    !!this.timerID && window.clearInterval(this.timerID);
    this.setState({ velocity: velocity });
    this.timerID = window.setInterval(() => this.tick(), velocity);
  };
  setAutomaton = (automaton: AutomatonDescription) => {
    !!this.props.probe && this.props.probe(automaton);
    this.setState({ automaton: automaton });
  };
  cellEvent = (cell: CellParams) => {
    !!this.props.probe && this.props.probe(cell);
    this.setState((prevState) => {
      return { data: SetCell(prevState.data, cell.row, cell.col) };
    });
  };
  componentWillUnmount() {
    !!this.timerID && window.clearInterval(this.timerID);
  }
  render() {
    return (
      <div className="app">
        <div className="header">
          {this.props.user}
          <button onClick={this.props.onSignedOut}>Выйти</button>
        </div>
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
              testId="sizex"
            />
          </div>
          <div className="knob-label">Размер Y:</div>
          <div>
            <Size
              onSizeChange={this.onYSizeChange}
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
              testId="actionrun"
            />
          </div>
          <div>
            <Button
              onAction={this.mute}
              status={!this.state.status}
              caption="Остановить"
              testId="actionstop"
            />
          </div>
          <div>
            <Button
              onAction={this.clear}
              status={false}
              caption="Сбросить"
              testId="actionclear"
            />
          </div>
          <div className="knob-label">Заполнение:</div>
          <div>
            <Size
              onSizeChange={this.setFillFactor}
              minSize={MIN_FILL}
              maxSize={MAX_FILL}
              defSize={DEF_FILL}
              testId="fillfactor"
            />
          </div>
          <div>
            <Button
              onAction={this.fill}
              status={false}
              caption="Заполнить"
              testId="actionfill"
            />
          </div>
        </div>
        <div className="lifecontainer">
          <Panel data={this.state.data} onChange={this.cellEvent} />
        </div>
      </div>
    );
  }
};
