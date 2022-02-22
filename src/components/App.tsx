import React, { Component } from "react";
import { UsersList } from "./sn-userslist/sn-userslist";
import { PostsList } from "./sn-postslist/sn-postslist";
import styles from "./App.module.css";

type TAppState = {
  userId: number;
  hasError: boolean;
};
class App extends Component<any, TAppState> {
  errorHandler = () => alert("Error!");

  constructor(props: any) {
    super(props);
    this.state = {
      userId: 0,
      hasError: false,
    };
    this.userSelected = this.userSelected.bind(this);
  }
  userSelected(id: number) {
    this.setState({ userId: id });
  }
  componentDidMount() {
    window.addEventListener("error", this.errorHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("error", this.errorHandler);
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.application}>
          <div className={styles.header}>My Messenger</div>
          <div className={styles.users}>Ошибка чтения данных</div>
          <div className={styles.posts}>Ошибка чтения данных</div>
          <div className={styles.footer}>&copy;2022</div>
        </div>
      );
    } else {
      return (
        <div className={styles.application}>
          <div className={styles.header}>My Messenger</div>
          <div className={styles.users}>
            <UsersList userSelected={this.userSelected} />
          </div>
          <div className={styles.posts}>
            <PostsList userId={this.state.userId} />
          </div>
          <div className={styles.footer}>&copy;2022</div>
        </div>
      );
    }
  }
}

export default App;
