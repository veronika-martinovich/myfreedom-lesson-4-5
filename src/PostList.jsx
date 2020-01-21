import React from "react";
import { PostPreview } from "./PostPreview";
import { FullPost } from "./FullPost";

export class PostList extends React.Component {
  state = {
    posts: null,
    users: null,
    postToOpen: {
      id: null,
      authorId: null
    }
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
    console.log(this.state.posts);

    this.setState({
      posts,
      users
    });
  }

  render() {
    if (!this.state.posts || !this.state.users) return "...Loading";
    if (this.state.postToOpen) {
      return (
        // Здесь для компонента FullPost вместо posts и users приходит undefined, 
        // хотя ниже по коду вместо posts и users приходят нормальные массивы
        <FullPost
          post={this.state.posts.find(
            post => post.id === this.state.postToOpen.id
          )}
          postAuthor={this.state.users.find(
              user => user.id === this.state.postToOpen.authorId
            )
          }
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
              onClick={() => {
                this.setState({
                  postToOpen: {
                    id: item.id,
                    authorId: item.userId
                  }
                });
              }}
            />
          ))}
        </ul>
      </div>
    );
  }
}
