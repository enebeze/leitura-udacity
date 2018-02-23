import React, { Component } from "react";
import Post from "./../components/Post";
import Footer from "./../components/Footer";
import MyHeader from "./../components/Header";
import FormPost from "./../components/FormPost";

import { withRouter } from 'react-router-dom'

import {
  Container,
  Dropdown,
  Header,
  Button,
  Message,
  Icon
} from "semantic-ui-react";

/* Redux */
import { connect } from 'react-redux';
import PostActions from './../store/ducks/posts';

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
    check: true
  };

  componentDidMount() {

    const { match: { params } } = this.props;
    this.props.postRequest(params.category, params.post_id);

    this.getAllCategories();
  }

  getAllCategories = () => {
    fetch("http://localhost:3001/categories/", {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(c => {
        const categories = [];
        categories.push({ text: "All", value: "" });
        c.categories.map(cat => categories.push({ text: cat.name, value: cat.path }));
        this.setState({ categories });
      });
    });
  };


  changeModal = postEdit => {
    this.setState({ showModal: !this.state.showModal, postEdit });
  };

  editPost = postEdit => {
    this.changeModal(postEdit);
  };

  render() {
    const { categories } = this.state;
    const posts = this.props.state.data;
    const isDetailsPage = this.props.state.isDetailsPage;
    const { history } = this.props;
console.log(isDetailsPage);
    return (
      <div>
        <MyHeader />

        <Container text style={{ marginTop: "7em" }}>
          {isDetailsPage ? (
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
                      this.props.postRequest(d.value);
                    }}
                  />
                </Header>
                <Header as="h5" floated="right">
                  Order by{" "}
                  <Dropdown
                    inline
                    options={orderOptions}
                    onChange={(e, d) => this.props.postOrder(d.value) }
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

          {posts.length === 0 && (
            <Message
              icon="hand pointer"
              color="blue"
              header="No posts added"
              content="Please click on New Post to add the first post"
            />
          )}

          {posts.map(p => (
            <Post key={p.id} post={p} editPost={this.editPost} isDetailsPage={isDetailsPage} />
          ))}

          {isDetailsPage && (
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

const mapStateToProps = state => ({
    state: state.post
});

const mapDispatchToProps = dispatch => ({
  postRequest: (category, post_id) => dispatch(PostActions.postRequest(category, post_id)),
  postOrder: order => dispatch(PostActions.postOrder(order)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
