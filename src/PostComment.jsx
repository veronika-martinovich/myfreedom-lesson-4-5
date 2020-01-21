import React from "react";

export const PostComment = (props) => {
  return (
    <div className="posts_comment">
      <p className="posts_comment-author">{props.commentAuthor}</p>
      <p className="posts_comment-body">{props.commentBody}</p>
    </div>
  )
}