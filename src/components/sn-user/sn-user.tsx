import React, { Component } from "react";
import { UserAddress } from "../sn-user-address/sn-user-address";
import { UserCompany } from "../sn-user-company/sn-user-company";

import styles from "./sn-users.module.css";

export type TUserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
};
export type TUserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};
export type TUserProps = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: TUserAddress;
  phone?: string;
  website?: string;
  company?: TUserCompany;
};

export class User extends Component<TUserProps> {
  constructor(props: TUserProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>{this.props.email}</div>
        <div>{this.props.website || "website not listed"}</div>
        <div>{this.props.phone || "phone not listed"}</div>
        {!!this.props.address ? <UserAddress {...this.props.address} /> : null}
        {!!this.props.company ? <UserCompany {...this.props.company} /> : null}
      </div>
    );
  }
}
