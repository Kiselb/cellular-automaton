import React, { Component } from "react";
import { TUserAddress } from "components/sn-user/sn-user";
import styles from "./sn-user-address.module.css";
type TState = {
  display: boolean;
};
export class UserAddress extends Component<TUserAddress, TState> {
  constructor(props: TUserAddress) {
    super(props);
    this.state = { display: false };
    this.toggleAddress = this.toggleAddress.bind(this);
  }

  toggleAddress() {
    this.setState((prevState) => ({ display: !prevState.display }));
  }
  render() {
    return (
      <div data-testid="1" onClick={this.toggleAddress}>
        <div className={styles.toggle}>
          {!this.state.display ? "View Address" : "Hide Address"}
        </div>
        {this.state.display ? (
          <div className={styles.address}>
            <div>{this.props.street}</div>
            <div>{this.props.suite}</div>
            <div>{this.props.city}</div>
            <div>{this.props.zipcode}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
