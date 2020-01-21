import React from "react";

export const PostPreview = props => {
  return (
    <li className="posts_item">
      <h3
        className="posts_heading posts_heading__preview"
        onClick={() => props.onClick()}
      >
        {props.postTitle}
      </h3>
      <p className="posts_author posts_author__preview">{props.postAuthor}</p>
    </li>
  );
};
