import React, { Component } from "react";
import Post from "./../components/Post";
import Footer from "./../components/Footer";
import MyHeader from "./../components/Header";
import FormPost from "./../components/FormPost";

import _ from "lodash";

import { withRouter } from "react-router-dom";

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

const orderOptions = [
  { key: "d", text: "Date", value: "timestamp" },
  { key: "p", text: "Score", value: "voteScore" }
];

class Home extends Component {

  componentDidMount() {
    // Receive props
    const { match: { params } } = this.props;
    this.props.postRequest(params.category, params.post_id);
    // Get Categories
    this.props.categoryRequest();
  }

  componentWillReceiveProps(nextPros) {
    const { match: { params } } = nextPros;
    if (params.category !== this.props.match.params.category || 
        params.post_id !== this.props.match.params.post_id)
      this.props.postRequest(params.category, params.post_id);
  }

  

  render() {
    /* Categories and Posts Redux */
    const { categories } = this.props.categoryState;
    const { posts, isDetailsPage } = this.props.postState;
    const postsArray = _.values(posts);

    /* Route Params */
    const categorySelected = this.props.match.params.category;

    const { history } = this.props;

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
                onClick={() => this.props.changeModal()} >
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
                    value={categorySelected}
                    options={categories}
                    onChange={(e, d) => {
                      history.push(`/${d.value}`);
                      //this.props.postRequest(d.value);
                    }}
                  />
                </Header>
                <Header as="h5" floated="right">
                  Order by{" "}
                  <Dropdown
                    inline
                    options={orderOptions}
                    value={this.props.postState.orderBy}
                    onChange={(e, d) => this.props.postOrder(d.value)}
                  />
                </Header>
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <Message
              icon="hand pointer"
              color="blue"
              header="No posts added"
              content="Please click on New Post to add the first post"
            />
          )}

          {
            postsArray.map(p => (
            <Post
              key={p.id}
              post={p}
              isDetailsPage={isDetailsPage}
            />
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

        <FormPost />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    postState: state.post,
    categoryState: state.category
  })
};

const mapDispatchToProps = dispatch => ({
  /* Post Actions */
  postRequest: (category, post_id) => dispatch(PostActions.postRequest(category, post_id)),
  postOrder: order => dispatch(PostActions.postOrder(order)),
  changeModal: () => dispatch(PostActions.changeModal(null)),

  /* Category Actions */
  categoryRequest: () => dispatch(CategoryActions.categoryRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
