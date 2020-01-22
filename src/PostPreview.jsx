import React from "react";

export const PostPreview = props => {
  return (
    <li className="posts_post-preview">
      <h3
        className="post-preview_heading"
        onClick={() => props.onHeadingClick()}
      >
        {props.postTitle}
      </h3>
      <p className="post-preview_author">
        Author: 
        <span onClick={() => props.onAuthorClick()}> {props.postAuthor}</span>
      </p>
    </li>
  );
};
