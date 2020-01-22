import React from "react";

export const AuthorPosts = props => {
  return (
    <div className="author_container">
      <button className="author_button" onClick={() => props.onBackClick()}>
        Back
      </button>
      <p className="author_name">Author: {props.author.name}</p>
      <ul className="author_posts">
        Posts:
        {props.authorPosts.map(item => (
          <li key={item.id} className="author_post-heading">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
