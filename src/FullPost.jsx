import React from "react";
import { PostComment } from "./PostComment";

export class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null
    };
  }

  async componentDidMount() {
    const responseComments = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const comments = await responseComments.json();

    this.setState({
      comments
    });
  }

  render() {
    let comments;
    if (!this.state.comments) {
      comments = "...Loading";
    } else {
      comments = this.state.comments
        .filter(comment => comment.postId === this.props.post.id)
        .map(item => (
          <PostComment
            key={item.id}
            commentAuthor={item.email}
            commentBody={item.body}
          />
        ));
    }

    return (
      <div>
        <h5 className="posts_heading posts_heading__full">
          {this.props.post.title}
        </h5>
        <p className="posts_author posts_author__full">
          {this.props.postAuthor.name}
        </p>
        <p className="posts_body">
          {this.props.post.body}
        </p>
        {comments}
      </div>
    );
  }
}
