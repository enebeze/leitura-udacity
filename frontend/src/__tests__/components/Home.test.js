import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";

/* Redux actions */
import PostActions from "../../app/store/ducks/posts";
import CommentActions from "../../app/store/ducks/comment";

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

/* store */
const store = mockStore(initialState);

/* Component post */
function createWrapper() {
  return shallow(<Home match={params} />, { context: { store } }).dive();
}

describe("Testing render home component", () => {
  it("should render My header", () => {
    /* my component */
    const wrapper = createWrapper();
    /* expect */
    expect(wrapper.find(MyHeader)).toHaveLength(1);
  });

  it("should render without isDetailsPage", () => {
    /* my component */
    const wrapper = createWrapper();
    /* expect has header home */
    expect(wrapper.find("#header_home")).toHaveLength(1);
    expect(wrapper.find("#header_post_details")).toHaveLength(0);
  });

  it("should render with isDetailsPage", () => {
    /* set state true */
    initialState.post.isDetailsPage = true;
    /* create component with isDetilsPage true */
    const wrapper = createWrapper();
    /* no details page */
    expect(wrapper.find("#header_post_details")).toHaveLength(1);
    expect(wrapper.find("#header_home")).toHaveLength(0);
  });

  it("render posts as expected", () => {
    /* my component */
    const wrapper = createWrapper();
    /* have two posts */
    expect(wrapper.find(Post)).toHaveLength(2);
  });

  it("should render message without posts", () => {
    /* clear posts */
    initialState.post.posts = [];
    /* my component */
    const wrapper = createWrapper();
    /* expect one message */
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it("should render footer", () => {
    /* my component */
    const wrapper = createWrapper();
    /* expect */
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it("should render form post", () => {
    /* my component */
    const wrapper = createWrapper();
    /* expect */
    expect(wrapper.find(FormPost)).toHaveLength(1);
  });
});

describe("Testing home actions", () => {
  it("should show modal", () => {
    /* set state true */
    initialState.post.isDetailsPage = false;
    /* my component */
    const wrapper = createWrapper();
    /* simulate edit button click */
    wrapper.find("#new_post").simulate("click");
    /* my expect */
    expect(store.getActions()).toContainEqual(PostActions.changeModal(null));
  });
});
