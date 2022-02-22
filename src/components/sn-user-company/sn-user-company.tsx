import React, { Component } from "react";
import { TUserCompany } from "../sn-user/sn-user";
import styles from "./sn-user-company.module.css";

type TState = {
  display: boolean;
};
export class UserCompany extends Component<TUserCompany, TState> {
  constructor(props: TUserCompany) {
    super(props);
    this.state = {
      display: false,
    };
    this.toggleCompany = this.toggleCompany.bind(this);
  }
  toggleCompany() {
    this.setState((prevState) => ({ display: !prevState.display }));
  }

  render() {
    return (
      <div data-testid="1" onClick={this.toggleCompany}>
        <div className={styles.toggle}>
          {!this.state.display ? "View Company" : "Hide Company"}
        </div>
        {this.state.display ? (
          <div className={styles.company}>
            <div>{this.props.name}</div>
            <div>{this.props.catchPhrase}</div>
            <div>{this.props.bs}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
