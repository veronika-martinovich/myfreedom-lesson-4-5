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
      <div className="posts_full-post">
        <button className="full-post_button" 
        onClick={() => this.props.onBackClick()}
        >
          Back
        </button>
        <h5 className="full-post_heading">{this.props.post.title}</h5>
        <p className="full-post_author">Author: {this.props.postAuthor.name}</p>
        <p className="full-post_body">{this.props.post.body}</p>
        <br />
        <div className="full-post_comments">{comments}</div>
      </div>
    );
  }
}
