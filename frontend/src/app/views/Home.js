import React, { Component } from "react";
import _ from 'lodash';
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
  TextArea
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
    postEdit: null
  };

  componentDidMount() {
    
    const { match: { params } } = this.props;

    this.getPosts(params.category);

    this.getAllCategories();
  }
  

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = nextProps;

    this.getPosts(params.category);
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

  getPosts = (category) => {
    

    let url = category
      ? `http://localhost:3001/${category}/posts`
      : "http://localhost:3001/posts";
    fetch(url, {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(posts => this.setState({ posts }));
    });
  };

  changeModal = (postEdit) => {
    this.setState({ showModal: !this.state.showModal, postEdit });
  };

  editPost = (postEdit) => {
    this.changeModal(postEdit);
  }

  orderPostsBy = (order) => {
    const posts = _.orderBy(this.state.posts, order, "desc");
    this.setState({ posts }, console.log(this.state.posts));
  }

  render() {
    const { posts, categories } = this.state;

    return (
      <div>
        <MyHeader />

        <Container text style={{ marginTop: "7em" }}>
          <div>
            <Button basic color="blue" fluid onClick={() => this.changeModal(null) }>
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
              paddingBottom: 40
            }}
          >
            <Header as="h5" floated="left">
              Categories by{" "}
              <Dropdown
                inline
                options={categories}
                onChange={(e, d) => {
                  const { history } = this.props;
                  history.push(`/${d.value}`);
                  //this.getPosts(d.value);
                }}
              />
            </Header>
            <Header as="h5" floated="right">
              Order by {" "}
              <Dropdown inline options={orderOptions} 
                onChange={(e, d) => {
                  this.orderPostsBy(d.value);
                }}
              />
            </Header>
          </div>
                  
          {posts.map(p => (
            <Post
              key={p.id}
              post={p}
              editPost={this.editPost}
            />
          ))}
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
