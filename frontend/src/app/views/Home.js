import React, { Component } from "react";
import _ from "lodash";
import Post from "./../components/Post";
import CommentPost from "./../components/CommentPost";
import Footer from "./../components/Footer";
import MyHeader from "./../components/Header";
import FormPost from "./../components/FormPost";
import { Link } from "react-router-dom";

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
  TextArea,
  Message,
  Icon
} from "semantic-ui-react";

const orderOptions = [
  { key: "d", text: "Date", value: "timestamp" },
  { key: "p", text: "Score", value: "voteScore" }
];

class Home extends Component {
  state = {
    showModal: false,
    posts: [],
    categories: [],
    postEdit: null,
    isDetailsPage: false
  };

  componentDidMount() {
    const { match: { params } } = this.props;

    this.getPosts(params.category, params.post_id);

    this.getAllCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = nextProps;

    this.getPosts(params.category, params.post_id);
  }

  getAllCategories = () => {
    fetch("http://localhost:3001/categories/", {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(c => {
        const categories = [];
        categories.push({ text: "All", value: "" });
        c.categories.map(cat => {
          categories.push({ text: cat.name, value: cat.path });
        });

        this.setState({ categories });
      });
    });
  };

  getPosts = (category, post_id) => {
    let url = !category
      ? "http://localhost:3001/posts"
      : post_id
        ? `http://localhost:3001/posts/${post_id}`
        : `http://localhost:3001/${category}/posts`;
    fetch(url, {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(p => {
        const posts = p instanceof Array ? p : [p];
        this.setState({ posts, isDetailsPage: post_id ? true : false });
      });
    });
  };

  changeModal = postEdit => {
    this.setState({ showModal: !this.state.showModal, postEdit });
  };

  editPost = postEdit => {
    this.changeModal(postEdit);
  };

  orderPostsBy = order => {
    const posts = _.orderBy(this.state.posts, order, "desc");
    this.setState({ posts }, console.log(this.state.posts));
  };

  render() {
    const { posts, categories } = this.state;
    const { history } = this.props;

    return (
      <div>
        <MyHeader />

        <Container text style={{ marginTop: "7em" }}>
          {this.state.isDetailsPage ? (
            <div>
              <Header as="h2" icon textAlign="center">
                <Icon name="vcard outline" />
                <Header.Content>Post Details</Header.Content>
              </Header>
            </div>
          ) : (
            <div>
              <Button
                basic
                color="blue"
                fluid
                onClick={() => this.changeModal(null)}
              >
                New Post
              </Button>

              <div
                style={{
                  paddingTop: 20,
                  paddingBottom: 40
                }}
              >
                <Header as="h5" floated="left">
                  Categories by{" "}
                  <Dropdown
                    inline
                    options={categories}
                    onChange={(e, d) => {
                      history.push(`/${d.value}`);
                      //this.getPosts(d.value);
                    }}
                  />
                </Header>
                <Header as="h5" floated="right">
                  Order by{" "}
                  <Dropdown
                    inline
                    options={orderOptions}
                    onChange={(e, d) => {
                      this.orderPostsBy(d.value);
                    }}
                  />
                </Header>
              </div>
            </div>
          )}

          {/* 
                <Header as="h1">Semantic UI React Fixed Template</Header>
                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>
                    A text container is used for the main container, which is useful for
                    single column layouts.
                </p> 
            */}

          {posts.length == 0 && (
            <Message
              icon="hand pointer"
              color="blue"
              header="No posts added"
              content="Please click on New Post to add the first post"
            />
          )}

          {posts.map(p => (
            <Post key={p.id} post={p} editPost={this.editPost} />
          ))}

          {this.state.isDetailsPage && (
            <Button
              labelPosition="left"
              icon="left chevron"
              content="Back"
              onClick={() => {
                history.goBack();
              }}
            />
          )}
        </Container>

        <Footer />

        <FormPost
          showModal={this.state.showModal}
          changeModal={this.changeModal}
          post={this.state.postEdit}
        />
      </div>
    );
  }
}

export default Home;
