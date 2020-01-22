import React from "react";

export const PostPreview = props => {
  return (
    <li className="posts_post-preview">
      <h3
        className="post-preview_heading"
        onClick={() => props.onClick()}
      >
        {props.postTitle}
      </h3>
      <p className="post-preview_author">{props.postAuthor}</p>
    </li>
  );
};
