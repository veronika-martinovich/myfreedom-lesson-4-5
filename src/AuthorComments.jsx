import React from "react";

export class AuthorComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }
  

  async componentDidMount() {
    const responsePosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await responsePosts.json();

    this.setState({
      posts
    });
  }

  filterPosts = () => {
    let commentedPosts = [];
    this.props.authorComments.forEach(item =>
      this.state.posts.forEach(elem => {
        if (item.postId === elem.id) {
          commentedPosts.push(elem);
        }
      })
    );
    return commentedPosts;
  };

  render() {
    if (!this.state.posts) return "...Loading";
    return (
      <div className="comments_container">
        <button className="comments_button" onClick={() => this.props.onBackClick()}>
          Back
        </button>
        <p className="comments_name">
          Comment author: {this.props.commentAuthor}
        </p>
        <ul className="comments_list">
          Posts:
          {this.filterPosts().map(item => (
            <li key={item.id} className="comments_item">
              <h3 className="comments_post-heading">{item.title}</h3>
              <p className="comments_post-comment">
                Comment: {this.props.authorComments.find(elem => item.id === elem.postId).body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
