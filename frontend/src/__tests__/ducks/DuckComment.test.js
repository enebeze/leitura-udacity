import CommentActions, { reducer } from "../../app/store/ducks/comment";
import { arrayToObject } from "../../app/util/helpers";

const comments = require("../data/posts.json").initialState.comment.comments;
const comment = require("../data/comment.json").comment;

describe("Testing comment reducer", () => {
  it("can request comment success", () => {
    /* create state and reques success  */
    const state = reducer({}, CommentActions.commentRequestSuccess(comments));
    /* expect posts have value */
    expect(state.comments).toBeTruthy();
    /* expect posts has been added */
    expect(state.comments).toEqual(comments);
  });

  it("can save comments success", () => {
    /* create state without posts and add new post */
    const state = reducer(
      { comments: {} },
      CommentActions.commentSaveSuccess(comment)
    );
    /* expect posts has been added */
    expect(state.comments[comment.parentId][comment.id]).toEqual(comment);
  });

  it("can remove comments success", () => {
    /* create state and reques success  */
    const state = reducer({}, CommentActions.commentRemoveSuccess(comments));
    /* expect posts has been added */
    expect(state.comments).toEqual(comments);
  });

  it("can clear comments", () => {
    /* create state with comments  */
    let state = reducer(comments);
    /* clear comments */
    state = reducer(state, CommentActions.commentClear());
    /* expect comments has been cleared */
    expect(state.comments).toEqual({});
  });
});
