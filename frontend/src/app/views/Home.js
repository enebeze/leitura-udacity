import React, { Component } from "react";
import Post from "./../components/Post";
import CommentPost from "./../components/CommentPost";
import Footer from "./../components/Footer";
import MyHeader from "./../components/Header";
import NewPost from "./../components/NewPost";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Item,
  Comment,
  Form,
  Select,
  TextArea
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const friendOptions = [
  {
    text: "All",
    value: "All"
  },
  {
    text: "react",
    value: "react"
  },
  {
    text: "redux",
    value: "redux"
  },
  {
    text: "udacity",
    value: "udacty"
  }
];

class Home extends Component {
  state = {
    showModal: false,
    posts: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/posts/", {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(posts => this.setState({ posts }));
    });
  }

  changeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  addNewPost = () => {
    this.changeModal();
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <MyHeader />

        <Container text style={{ marginTop: "7em" }}>
          <div>
            <Button basic color="blue" fluid onClick={this.changeModal}>
              New post
            </Button>
          </div>
          {/* 
                <Header as="h1">Semantic UI React Fixed Template</Header>
                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>
                    A text container is used for the main container, which is useful for
                    single column layouts.
                </p> 
            */}

          <div
            style={{
              paddingTop: 20,
              paddingBottom: 40,
            }}
          >
            <Header as="h5" floated="left">
              Categories by <Dropdown inline options={friendOptions} />
            </Header>
            <Header as="h5" floated="right">
              Order by <Dropdown inline options={friendOptions} />
            </Header>

          </div>

          {posts.map(p => (
            <Post
              key={p.id}
              id={p.id}
              title={p.title}
              author={p.author}
              description={p.body}
              category={p.category}
              hasComment={p.commentCount > 0}
              voteScore={p.voteScore}
            />
          ))}
        </Container>
        <Footer />

        <NewPost
          showModal={this.state.showModal}
          changeModal={this.changeModal}
          addNewPost={this.addNewPost}
        />
      </div>
    );
  }
}

export default Home;
