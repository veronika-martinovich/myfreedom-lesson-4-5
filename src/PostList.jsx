import React from "react";
import { PostPreview } from "./PostPreview";
import { FullPost } from "./FullPost";
import { AuthorPosts } from "./AuthorPosts";

export class PostList extends React.Component {
  state = {
    posts: null,
    users: null,
    postToOpen: null,
    postToOpenAuthor: null,
    authorToOpen: null
  };

  async componentDidMount() {
    const responsePosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await responsePosts.json();
    const responseUsers = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = await responseUsers.json();

    this.setState({
      posts,
      users
    });
  }

  render() {
    if (!this.state.posts || !this.state.users) return "...Loading";
    if (this.state.postToOpen) {
      return (
        <FullPost
          post={this.state.posts.find(
            post => post.id === this.state.postToOpen
          )}
          postAuthor={this.state.users.find(
              user => user.id === this.state.postToOpenAuthor
            )
          }
          onBackClick={()=>{
            this.setState({
              postToOpen: null,
              postToOpenAuthor: null
            })
          }}
        />
      )};
    if (this.state.authorToOpen) {
      return (
        <AuthorPosts
          author={this.state.users.find(
            user => user.id === this.state.authorToOpen
          )}
          authorPosts={this.state.posts.filter(
            post => post.userId === this.state.authorToOpen
          )}
          onBackClick={()=>{
            this.setState({
              authorToOpen: null
            })
          }}
        />
      )};
    return (
      <div className="posts_container">
        <ul className="posts_list">
          {this.state.posts.map(item => (
            <PostPreview
              key={item.id}
              postTitle={item.title}
              postAuthor={
                this.state.users.find(user => user.id === item.userId).name
              }
              onHeadingClick={() => {
                this.setState({
                  postToOpen: item.id,
                  postToOpenAuthor: item.userId
                });
              }}
              onAuthorClick={() => {
                this.setState({
                  authorToOpen: item.userId
                })
              }}
            />
          ))}
        </ul>
      </div>
    );
  }
}
