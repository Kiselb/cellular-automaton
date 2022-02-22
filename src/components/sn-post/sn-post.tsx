import React, { Component } from "react";

export type TPostProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export class Post extends Component<TPostProps> {
  constructor(props: TPostProps) {
    super(props);
  }
  render() {
    return <>{this.props.body}</>;
  }
}
