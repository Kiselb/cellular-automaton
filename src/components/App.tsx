import React, { Component } from "react";

import { Size } from "../components/size/Size";
import { Velocity } from "../components/velocity/Velocity";
import { Button } from "../components/button/Button";
import { Panel } from "../components/panel/Panel";
import { CellParams } from "../components/cell/Cell";
import { CalcState } from "../components/Engine";

import "./App.css";

const MIN_ROWS = 10;
const MAX_ROWS = 100;
const DEF_ROWS = 50;
const MIN_COLS = 10;
const MAX_COLS = 100;
const DEF_COLS = 50;
const MIN_FILL = 10;
const MAX_FILL = 90;
const DEF_FILL = 25;
const DEF_VELOCITY = 100;

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
    };
  }
  setXSize = (size: number) => {
    this.setState((prevState) => {
      if (size > prevState.cols) {
        return { cols: size, data: prevState.data.map((row) => [...row, 0]) };
      }
      return {
        cols: size,
        data: prevState.data.map((row) =>
          row.filter((_, index) => index < size)
        ),
      };
    });
  };
  setYSize = (size: number) => {
    this.setState((prevState) => {
      if (size > prevState.rows) {
        return {
          rows: size,
          data: [
            ...prevState.data,
            Array.from({ length: prevState.cols }, () => 0),
          ],
        };
      }
      return {
        rows: size,
        data: prevState.data.filter((_, index) => index < size),
      };
    });
  };
  tick = () => {
    this.state.status &&
      this.setState((prevState) => {
        return { epoch: prevState.epoch + 1 };
      });
    this.state.status &&
      this.setState((prevState) => {
        return { data: CalcState(prevState.data) };
      });
  };
  run = () => {
    this.setState({ status: true });
  };
  mute = () => {
    this.setState({ status: false });
  };
  clear = () => {
    this.setState({ epoch: 0 });
    this.setState({
      status: false,
      data: Array.from({ length: this.state.rows }, () =>
        Array.from({ length: this.state.cols }, () => 0)
      ),
    });
  };
  fill = () => {
    this.setState({ epoch: 0 });
    this.setState({
      data: this.state.data.map((row) =>
        row.map(() => (100 * Math.random() > this.state.factor ? 0 : 1))
      ),
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
  cellEvent = (cell: CellParams) => {
    console.log(cell);
    this.setState((prevState) => {
      return {
        data: [
          ...prevState.data.slice(0, cell.row),
          [
            ...prevState.data[cell.row].slice(0, cell.col),
            cell.generation > 0 ? 0 : 1,
            ...prevState.data[cell.row].slice(cell.col + 1),
          ],
          ...prevState.data.slice(cell.row + 1),
        ],
      };
    });
  };
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), this.state.velocity);
  }
  componentWillUnmount() {
    !!this.timerID && clearInterval(this.timerID);
  }
  render() {
    return (
      <div className="app">
        <div className="control">
          <div className={["knob-label"].join(" ")}>Эпоха:</div>
          <div className={["epoch"].join(" ")}>{this.state.epoch}</div>
          <div className={["knob-label"].join(" ")}>Размер X:</div>
          <div>
            <Size
              onSizeChange={this.setXSize}
              minSize={MIN_COLS}
              maxSize={MAX_COLS}
              defSize={DEF_COLS}
            />
          </div>
          <div className={["knob-label"].join(" ")}>Размер Y:</div>
          <div>
            <Size
              onSizeChange={this.setYSize}
              minSize={MIN_ROWS}
              maxSize={MAX_ROWS}
              defSize={DEF_ROWS}
            />
          </div>
          <div className={["knob-label"].join(" ")}>Скорость:</div>
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
          <div className={["knob-label"].join(" ")}>Заполнение:</div>
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
