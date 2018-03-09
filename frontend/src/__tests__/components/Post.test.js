import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";

/* Redux actions */
import PostActions from "../../app/store/ducks/posts";
import CommentActions from "../../app/store/ducks/comment";

/* Components */
import Post from "../../app/components/Post";
import CommentPost from "../../app/components/CommentPost";
import { Modal } from 'antd';

/* Mock store */
const mockStore = configureStore();

/* data json */
const datas = require("../data/posts.json");

/* consts */
const initialState = datas.initialState;
const post = datas.post;

/* store */
const store = mockStore(initialState);

/* Component post */
function createWrapper() {
  return shallow(<Post post={post} />, { context: { store } }).dive();
}

let wrapper;

describe("Testing component post", () => {
  
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it("render link to details", () => {
    /* Test values render */
    expect(
      wrapper
        .find("#link_title")
        .prop("to")
    ).toBe(`/${post.category}/${post.id}`);
  });

  it("render comments as expected", () => {
    /* my expect */
    expect(wrapper.find(CommentPost)).toHaveLength(2);
  });

  it("button back only details page", () => {
    /* no have button */
    expect(wrapper.find("#back")).toHaveLength(0);
    /* set details page */
    wrapper.setProps({ isDetailsPage: true });
    /* now have button */
    expect(wrapper.find("#back")).toHaveLength(1);
  });

  it("form add comments only details page", () => {
    /* no have form add comment */
    expect(wrapper.find("#form_add_comment")).toHaveLength(0);
    /* set details page */
    wrapper.setProps({ isDetailsPage: true });
    /* now have form add comment */
    expect(wrapper.find("#form_add_comment")).toHaveLength(1);
  });  
});

describe("Testing post actions", () => {

  it("should edit post", () => {
    /* simulate edit button click */
    wrapper.find("#edit").simulate("click");
    /* my expect */
    expect(store.getActions()).toContainEqual(PostActions.changeModal(post));
  });

  it("should remove post", () => {
    /* my spy */
    sinon.spy(Modal, "confirm");
    /* simulate button click */
    wrapper.find("#delete").simulate("click");    
    /* get params */
    const params = Modal.confirm.args[0][0];
    /* Simulate press YES */
    params.onOk();
    // my expect
    expect(store.getActions()).toContainEqual(PostActions.postRemove(post.id));    
  });

  it("should like or not like post", () => {
    /* simulate like button click */
    wrapper.find("#like_btn").simulate("click");
    /* expect action like */
    expect(store.getActions()).toContainEqual(PostActions.postLikeNotLike(post.id, "upVote"));
    
    /* simulate not like button click */
    wrapper.find("#not_like_btn").simulate("click");
    /* expect action not like */
    expect(store.getActions()).toContainEqual(PostActions.postLikeNotLike(post.id, "downVote"));
  });
})

describe("Testing comment actions", () => {

  it("should clear comment when back button click", () => {
    /* create function goback to simulate navigation */
    const history = { goBack: () => { }}
    /* set details page */
    wrapper.setProps({ isDetailsPage: true, history: history });
    /* click button */
    wrapper.find("#back").simulate("click");
    /* expect action clear comment */
    expect(store.getActions()).toContainEqual(CommentActions.commentClear(post.id));
  });

  it("should save comment", () => {
    /* my spy */
    const saveCommentSpy = sinon.spy(CommentActions, "commentSave")
    /* set details page */
    wrapper.setProps({ isDetailsPage: true });
    /* set state */
    wrapper.setState({ bodyComment: "New comment" });
    /* click button */
    wrapper.find("#add_comment").simulate("click");
    /* expect the action save comment to be run once */
    expect(saveCommentSpy.calledOnce).toBe(true);
  })

});