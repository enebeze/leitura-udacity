import React, { Component } from "react";
import Post from "./../components/Post";
import Footer from "./../components/Footer";
import MyHeader from "./../components/Header";
import FormPost from "./../components/FormPost";

import _ from "lodash";
import { message } from "antd";

import {
  Container,
  Dropdown,
  Header,
  Button,
  Message,
  Icon
} from "semantic-ui-react";

/* Redux */
import { connect } from "react-redux";

/* Actions Creators */
import PostActions from "./../store/ducks/posts";
import CategoryActions from "./../store/ducks/category";
import FormActions from "./../store/ducks/form";

const orderOptions = [
  { key: "d", text: "Date", value: "timestamp" },
  { key: "p", text: "Score", value: "voteScore" },
  { key: "c", text: "Comments", value: "commentCount" }
];

class Home extends Component {
  componentDidMount() {
    // Receive props
    const { category, postId } = this.props;
    this.props.postRequest(category, postId);
    // Get Categories
    this.props.categoryRequest();
  }

  componentWillReceiveProps(nextPros) {
    const { category, postId } = nextPros;
    if (category !== this.props.category || postId !== this.props.postId)
      this.props.postRequest(category, postId);
  }

  newPost = () => {
    if (this.props.user) {
      this.props.changeModal();
    } else {
      message.warning("Please login to post!");
    }
  };

  render() {
    /* Categories and Posts Redux */
    const { categories } = this.props.categoryState;
    const { posts, isDetailsPage, postsArray } = this.props.postState;

    /* Route Params */
    const categorySelected = this.props.category;
    const { history } = this.props;
    
    return (
      <div>
        <MyHeader />

        <Container text style={{ marginTop: "7em" }}>
          {isDetailsPage ? (
            <div id="header_post_details">
              <Header as="h2" icon textAlign="center">
                <Icon name="vcard outline" />
                <Header.Content>Post Details</Header.Content>
              </Header>
            </div>
          ) : (
            <div id="header_home">
              <Button
                id="new_post"
                basic
                color="blue"
                fluid
                onClick={this.newPost}
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
                    id="category"
                    inline
                    value={categorySelected}
                    options={categories}
                    onChange={(e, d) => history.push(`/${d.value}`)}
                  />
                </Header>
                <Header as="h5" floated="right">
                  Order by{" "}
                  <Dropdown
                    id="order_posts"
                    inline
                    options={orderOptions}
                    value={this.props.postState.orderBy}
                    onChange={(e, d) => this.props.postOrder(d.value)}
                  />
                </Header>
              </div>
            </div>
          )}

          {(Object.keys(posts).length === 0 && !this.props.postId ) && (
            <Message
              id="info_no_posts"
              icon="hand pointer"
              color="blue"
              header="No posts added"
              content="Please click on New Post to add the first post"
            />
          )}

          {(Object.keys(posts).length === 0 && this.props.postId ) && (
              <Message
                id="info_post_deleted"
                icon="announcement"
                color="red"
                header="404 Post not found"
                content="This post not exist or was deleted"
              />
            )}

          {postsArray.map(p => (
            <Post
              key={p.id}
              post={p}
              isDetailsPage={isDetailsPage}
              history={history}
            />
          ))}
        </Container>

        <Footer />

        <FormPost />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // Order by posts
  const postsArray = _.orderBy(state.post.posts, state.post.orderBy, "desc");
  return {
    postState: { ...state.post, postsArray },
    categoryState: state.category,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  /* Post Actions */
  postRequest: (category, postId) =>
    dispatch(PostActions.postRequest(category, postId)),
  postOrder: order => dispatch(PostActions.postOrder(order)),
  changeModal: () => dispatch(FormActions.changeModal()),

  /* Category Actions */
  categoryRequest: () => dispatch(CategoryActions.categoryRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
