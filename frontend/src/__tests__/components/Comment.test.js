import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import { Modal } from "antd";

/* Redux actions */
import CommentActions from "../../app/store/ducks/comment";

/* Components */
import CommentPost from "../../app/components/CommentPost";

/* Mock store */
const mockStore = configureStore();

/* data json */
const datas = require("../data/comment.json");

/* comment */
const { comment } = datas;

/* store */
const store = mockStore();

/* Component post */
function createWrapper() {
  return shallow(<CommentPost comment={comment} />, {
    context: { store }
  }).dive();
}

describe("Testing component CommentPost", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });
  it("should like comment", () => {
    /* simulate click like */
    wrapper.find("#like").simulate("click");
    /* expect */
    expect(store.getActions()).toContainEqual(
      CommentActions.commentLikeNotLike(comment.id, "upVote")
    );
  });

  it("should not like comment", () => {
    /* simulate click like */
    wrapper.find("#not_like").simulate("click");
    /* expect */
    expect(store.getActions()).toContainEqual(
      CommentActions.commentLikeNotLike(comment.id, "downVote")
    );
  });

  it("should show form edit only on edit state", () => {
    expect(wrapper.find("#form_edit")).toHaveLength(0);
    wrapper.setState({ editComment: true });
    expect(wrapper.find("#form_edit")).toHaveLength(1);
  });

  it("should show options comment only on edit state", () => {
    expect(wrapper.find("#comment_options")).toHaveLength(1);
    wrapper.setState({ editComment: true });
    expect(wrapper.find("#comment_options")).toHaveLength(0);
  });

  it("should change body edit", () => {
    /* body edit */
    const body = "Body edit comment";
    /* edit comment */
    wrapper.setState({ editComment: true });
    /* simulate change text */
    wrapper.find("#bodyEdit").simulate("change", null, { value: body });
    /* expect state change */
    expect(wrapper.state().bodyEdit).toBe(body);
  });

  it("should save comment", () => {
    /* my spy */
    const saveCommentSpy = sinon.spy(CommentActions, "commentSave");

    /* set state */
    wrapper.setState({ bodyEdit: "Update comment", editComment: true });
    /* click button */
    wrapper.find("#save").simulate("click");
    /* expect the action save comment to be run once */
    expect(saveCommentSpy.calledOnce).toBe(true);
    /* expect isAdd param is false */
    expect(saveCommentSpy.args[0][1]).toBe(false);
    /* callback function */
    wrapper.instance().clearState();
    /* expect state initial */
    expect(wrapper.state().bodyEdit).toBe("");
  });

  it("should cancel edit comment", () => {
    /* edit comment */
    wrapper.setState({ editComment: true });
    /* simulate click to cancel */
    wrapper.find("#cancel").simulate("click");
    /* expect editComment is false */
    expect(wrapper.state().editComment).toBe(false);
  });

  it("should edit comment", () => {
    /* simulate click edit */
    wrapper.find("#edit").simulate("click");
    /* expect change state */
    expect(wrapper.state()).toEqual({
      editComment: true,
      bodyEdit: comment.body
    });
  });

  it("should delete comment", () => {
    /* my spy */
    sinon.spy(Modal, "confirm");
    /* simulate button click */
    wrapper.find("#delete").simulate("click");
    /* get params */
    const params = Modal.confirm.args[0][0];
    /* Simulate press YES */
    params.onOk();
    /* my expect */
    expect(store.getActions()).toContainEqual(
      CommentActions.commentRemove(comment.id)
    );
  });
});
