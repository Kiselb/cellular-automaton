import React, { Component } from "react";
import { TUserProps, User } from "../sn-user/sn-user";
import styles from "./sn-userslist.module.css";

type TUsersListProps = {
  userSelected: (userId: number) => any;
  probe?: (param: any) => any;
};
type TUsersList = {
  users: TUserProps[];
  displayUser: string[];
};

export class UsersList extends Component<TUsersListProps, TUsersList> {
  constructor(props: TUsersListProps) {
    super(props);
    this.state = {
      users: [],
      displayUser: [],
    };
    this.viewDetails = this.viewDetails.bind(this);
    this.onClickUserName = this.onClickUserName.bind(this);
  }
  shouldComponentUpdate(nextProps: TUsersListProps, nextState: TUsersList) {
    return (
      this.state.users.length !== nextState.users.length ||
      this.state.displayUser.length !== nextState.displayUser.length
    );
  }
  componentDidMount() {
    console.log(`Get Users`);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          users: result.sort((a: TUserProps, b: TUserProps) => {
            if (a.username > b.username) {
              return 1;
            }
            if (a.username < b.username) {
              return -1;
            }
            return 0;
          }),
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ users: [] });
      });
  }
  viewDetails(username: string) {
    !!this.props.probe && this.props.probe(null);
    return () =>
      this.setState((prevState) => {
        if (prevState.displayUser.indexOf(username) < 0) {
          return { displayUser: [...prevState.displayUser, username] };
        } else {
          return {
            displayUser: prevState.displayUser.filter(
              (item) => item !== username
            ),
          };
        }
      });
  }
  onClickUserName(userId: number) {
    return () => this.props.userSelected(userId);
  }
  render() {
    return (
      <>
        {this.state.users.map((user) => (
          <div key={user.id} className={styles.panel}>
            <div className={styles.user}>
              <div
                className={styles.mark}
                onClick={this.viewDetails(user.username)}
                data-testid="40"
              >
                <div>...</div>
              </div>
              <div>
                <div
                  className={styles.username}
                  onClick={this.onClickUserName(user.id)}
                  data-testid="50"
                >
                  {user.username}
                </div>
                <div>{user.name}</div>
              </div>
            </div>
            {this.state.displayUser.indexOf(user.username) >= 0 ? (
              <User {...user} />
            ) : null}
          </div>
        ))}
      </>
    );
  }
}
