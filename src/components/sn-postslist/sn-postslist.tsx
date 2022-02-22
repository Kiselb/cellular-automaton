import React, { Component } from "react";
import { TPostProps, Post } from "../sn-post/sn-post";
import styles from "./sn-postslist.module.css";

export type TPostsListProps = {
  userId: number;
  probe?: (param: any) => any;
};
export type TPostsListState = {
  posts: TPostProps[];
  displayPosts: number[];
};
export class PostsList extends Component<TPostsListProps, TPostsListState> {
  constructor(props: TPostsListProps) {
    super(props);
    this.state = {
      posts: [],
      displayPosts: [],
    };
    this.LoadPosts = this.LoadPosts.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
  }
  LoadPosts() {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ posts: result });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ posts: [] });
      });
  }
  viewDetails(id: number) {
    !!this.props.probe && this.props.probe(null);
    return () =>
      this.setState((prevState) => {
        if (prevState.displayPosts.indexOf(id) < 0) {
          return { displayPosts: [...prevState.displayPosts, id] };
        } else {
          return {
            displayPosts: [
              ...prevState.displayPosts.filter((item) => item !== id),
            ],
          };
        }
      });
  }
  // Storybook typescript ругается
  //
  // static getDerivedStateFromProps(props: TPostsListProps, state: TPostsListState) {
  //     console.log(props);
  //     console.log(state);
  //     return state;
  // }
  getSnapshotBeforeUpdate(
    prevProps: TPostsListProps,
    prevState: TPostsListState
  ) {
    console.log(prevProps);
    console.log(prevState);
    // Возвращаемое значение должно быть выведено на консоль в методе componentDidUpdate
    return "From getSnapshotBeforeUpdate";
  }
  componentDidUpdate(
    prevProps: TPostsListProps,
    prevState: TPostsListState,
    snapshot: any
  ) {
    if (prevProps.userId !== this.props.userId) {
      this.LoadPosts();
    }
    console.log(snapshot);
  }
  render() {
    return (
      <div className={styles.container}>
        {this.state.posts.map((post) => (
          <div key={post.id} className={styles.panel}>
            <div className={styles.post}>
              <div
                className={styles.mark}
                onClick={this.viewDetails(post.id)}
                data-testid="10"
              >
                <div>...</div>
              </div>
              <div>
                <div
                  className={styles.title}
                  onClick={this.viewDetails(post.id)}
                  data-testid="20"
                >
                  {post.title}
                </div>
              </div>
            </div>
            {this.state.displayPosts.indexOf(post.id) >= 0 ? (
              <Post {...post} />
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
