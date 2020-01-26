import React from "react";
import { PostComment } from "./PostComment";
import { AuthorComments } from "./AuthorComments";

export class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      commentAuthorToOpen: null
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
            onCommentsAuthorClick={() => {
              this.setState({
                commentAuthorToOpen: item.email
              });
            }}
          />
        ));
    }

    if (this.state.commentAuthorToOpen) {
      return (
        <AuthorComments
          commentAuthor={this.state.commentAuthorToOpen}
          authorComments={this.state.comments.filter(
            item => item.email === this.state.commentAuthorToOpen
          )}
          onBackClick={() => {
            this.setState({
              commentAuthorToOpen: null
            })
          }}
        />
      );
    }
    return (
      <div className="posts_full-post">
        <button
          className="full-post_button"
          onClick={() => this.props.onBackClick()}
        >
          Back
        </button>
        <h2 className="full-post_heading">{this.props.post.title}</h2>
        <p className="full-post_author">Author: {this.props.postAuthor.name}</p>
        <p className="full-post_body">Post: {this.props.post.body}</p>
        <br />
        <h3 className="full-post_heading">Comments</h3>
        <div className="full-post_comments">{comments}</div>
      </div>
    );
  }
}
