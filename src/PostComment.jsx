import React from "react";

export const PostComment = props => {
  return (
    <div className="full-post_comment-item">
      <p
        className="full-post_comment-author"
        onClick={() => props.onCommentsAuthorClick()}
      >
        {props.commentAuthor}
      </p>
      <p className="full-post_comment-body">{props.commentBody}</p>
    </div>
  );
};
