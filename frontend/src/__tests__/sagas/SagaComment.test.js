import { runSaga } from "redux-saga";
import SagaTester from "redux-saga-tester";
import MockAdapter from "axios-mock-adapter";
import sinon from "sinon";
import * as apiComment from "../../app/api/apiComment";
import api from "../../app/api/api";
import rootSaga from "../../app/store/sagas";
import PostActions from "../../app/store/ducks/posts";
import CommentActions from "../../app/store/ducks/comment";

import * as sagas from "../../app/store/sagas/comment";

import { arrayToObject } from "../../app/util/helpers";

/* datas */
const posts = require("../data/home.json").initialState.post.posts;
const dataComment = require("../data/comment.json");
const comments = dataComment.comments; 
const commentsObject = dataComment.commentsObject;

describe("Testing sagas comments", () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it("should request comment", async () => {
    const commentsPost = {};
    const postsObjects = arrayToObject([posts[0]]);

    /* get comment request func */
    const gen = sagas.commentRequest();
    gen.next(); /* take */
    gen.next(); /* select */
    gen.next(postsObjects); /* call */
    /* put */
    const result = gen.next({ ok: true, data: comments }).value.PUT.action;
    /* object to test */
    commentsPost[posts[0].id] = arrayToObject(comments);
    /* expect action result has request success */
    expect(result).toEqual(CommentActions.commentRequestSuccess(commentsPost));
  });

  it("should add comment", async () => {
    const callback = jest.fn();
    /* mock the api add comment */
    apiMock.onPost("/comments").reply(200, comments[0]);
    /* dispatch comment save */
    sagaTester.dispatch(CommentActions.commentSave(comments[0], true, callback));
    /* wait for save success */
    await sagaTester.waitFor(CommentActions.commentSaveSuccess().type);
    /* my expect */
    expect(sagaTester.getLatestCalledAction()).toEqual(
      CommentActions.commentSaveSuccess(comments[0])
    );
    /* expect my callback called */
    expect(callback).toBeCalled();
  });

  it("should update comment", async () => {
    /* mock the api add comment */
    apiMock.onPut(`/comments/${comments[0].id}`).reply(200, comments[0]);
    /* dispatch comment save */
    sagaTester.dispatch(CommentActions.commentSave(comments[0], false));
    /* wait for save success */
    await sagaTester.waitFor(CommentActions.commentSaveSuccess().type);
    /* my expect */
    expect(sagaTester.getLatestCalledAction()).toEqual(
      CommentActions.commentSaveSuccess(comments[0])
    );
  });

  it("should remove comment", async () => {
    /* array of actions dispatched */
    const dispatched = [];
    /* my consts */
    const commentId = comments[0].id;
    /* simulate access api */
    sinon.stub(apiComment, "remove").callsFake(() => ({
      ok: true,
      data: comments[0]
    }));

    /* run my saga  */
    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ comment: { comments: commentsObject } })
      },
      sagas.commentRemove,
      { commentId }
    ).done;

    /* delete comment from my object*/
    delete commentsObject[commentId];

    /* expect api has been called with comment Id */
    expect(apiComment.remove.calledWith(commentId)).toBe(true);
    /* exepct my action success has been called */
    expect(dispatched).toContainEqual(
      CommentActions.commentRemoveSuccess(commentsObject)
    );
  });

    it("should like or not like comment", async () => {
      /* array of actions dispatched */
      const dispatched = [];
      /* my consts */
      const commentId = comments[0].id;
      /* simulate access api */
      sinon.stub(apiComment, "likeNotLike").callsFake(() => ({
        ok: true,
        data: comments[0]
      }));

      /* run my saga  */
      const result = await runSaga(
        {
          dispatch: action => dispatched.push(action)
        },
        sagas.commentLikeNotLike,
        { commentId, voteScore: "upVote" }
      ).done;

      /* expect api has been called with comment Id */
      expect(apiComment.likeNotLike.calledWith(commentId, { option: "upVote" })).toBe(true);
      /* exepct my action success has been called */
      expect(dispatched).toContainEqual(
        CommentActions.commentSaveSuccess(comments[0])
      );
    });
});
