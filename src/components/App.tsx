import React, { Component } from "react";
import Test from "./widget";

//import "../styles/App.css";
import styles from './App.module.css';

class App extends Component {
  constructor(props: any) {
    super(props);
    Test();
  }
  render() {
    return (
      <div>
        <h1 className={styles.header}>My React App!!!!</h1>
      </div>
    );
  }
}

export default App;
