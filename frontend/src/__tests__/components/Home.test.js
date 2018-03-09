import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";

/* Redux actions */
import PostActions from "../../app/store/ducks/posts";
import CommentActions from "../../app/store/ducks/comment";
import CategoryActions from "../../app/store/ducks/category";

/* Components */
import Home from "../../app/views/Home";
import Post from "../../app/components/Post";
import Footer from "../../app/components/Footer";
import MyHeader from "../../app/components/Header";
import FormPost from "../../app/components/FormPost";

import { Message } from "semantic-ui-react";
import { Modal } from "antd";

/* Mock store */
const mockStore = configureStore();

/* data json */
const datas = require("../data/home.json");

/* consts */
const { initialState, category, params } = datas;

/* 
  create a copy of initial state which can not be changed
  I can't using {...initialState} and Object.assign ({}, initialState)
  but is still changing 
*/
const state = JSON.parse(JSON.stringify(initialState));
/* store */
const store = mockStore(state);

/* Component post */
function createWrapper() {
  return shallow(<Home match={params} />, { context: { store } }).dive();
}

let wrapper;

beforeEach(() => {
  wrapper = createWrapper();
});

describe("Testing render home component", () => {
  it("should render My header", () => {
    /* expect */
    expect(wrapper.find(MyHeader)).toHaveLength(1);
  });

  it("should render without isDetailsPage", () => {
    /* expect has header home */
    expect(wrapper.find("#header_home")).toHaveLength(1);
    expect(wrapper.find("#header_post_details")).toHaveLength(0);
  });

  it("should render with isDetailsPage", () => {
    /* set state true */
    state.post.isDetailsPage = true;
    /* create component with isDetilsPage true */
    const wrapper = createWrapper();
    /* no details page */
    expect(wrapper.find("#header_post_details")).toHaveLength(1);
    expect(wrapper.find("#header_home")).toHaveLength(0);
  });

  it("render posts as expected", () => {
    /* have two posts */
    expect(wrapper.find(Post)).toHaveLength(2);
  });

  it("should render message without posts", () => {
    /* clear posts */
    state.post.posts = [];
    /* my component */
    const wrapper = createWrapper();
    /* expect one message */
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it("should render footer", () => {
    /* expect */
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it("should render form post", () => {
    /* expect */
    expect(wrapper.find(FormPost)).toHaveLength(1);
  });
});

describe("Testing home actions", () => {
  it("should request posts", () => {
    expect(store.getActions()).toContainEqual(PostActions.postRequest());
  });

  it("should request categories", () => {
    expect(store.getActions()).toContainEqual(
      CategoryActions.categoryRequest()
    );
  });

  it("should show modal", () => {
    /* set state true */
    state.post.isDetailsPage = false;
    /* my component */
    const wrapper = createWrapper();
    /* simulate new button click */
    wrapper.find("#new_post").simulate("click");
    /* my expect */
    expect(store.getActions()).toContainEqual(PostActions.changeModal(null));
  });

  it("should order posts", () => {
    const order = "voteScore";
    /* simulate change order posts with redux selected */
    wrapper.find("#order_posts").simulate("change", null, { value: order });
    /* my expect */
    expect(store.getActions()).toContainEqual(PostActions.postOrder(order));
  });

  it("should render request posts on receive news props", () => {
    const postId = initialState.post.posts[0]["id"];
    const category = initialState.post.posts[0].category;

    /* Set new props */
    wrapper.setProps({
      match: { params: { category: category, postId: postId } }
    });
    /* expect request again */
    expect(store.getActions()).toContainEqual(
      PostActions.postRequest(category, postId)
    );
  });

  it("should change route when selected category", () => {
    /* new category */
    const category = "redux";
    /* mock function */
    const push = jest.fn();
    /* set props with mock func */
    wrapper.setProps({ history: { push: push } });
    /* simulate change category with params */
    wrapper.find("#category").simulate("change", null, { value: category });
    /* my expect */
    expect(push).toBeCalledWith(`/${category}`);
  });
});
