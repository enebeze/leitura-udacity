import { runSaga } from "redux-saga";
import SagaTester from "redux-saga-tester";
import MockAdapter from "axios-mock-adapter";
import sinon from "sinon";
import * as apiPost from "../../app/api/apiPost";
import api from "../../app/api/api";
import rootSaga from "../../app/store/sagas";
import PostActions, { reducer } from "../../app/store/ducks/posts";

import * as sagas from "../../app/store/sagas/posts";

import { arrayToObject } from "../../app/util/helpers";

const posts = require("../data/home.json").initialState.post.posts;

describe("Testing sagas posts", () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester(posts);
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it("should request posts success", async () => {
    /* mock the request api */
    apiMock.onGet("/posts").reply(200, posts);
    /* dispatch post request */
    sagaTester.dispatch(PostActions.postRequest());
    /* await for request success */
    await sagaTester.waitFor(PostActions.postRequestSuccess().type);
    /* expect the action request succes has been called */
    expect(sagaTester.getCalledActions()).toContainEqual(
      PostActions.postRequestSuccess(arrayToObject(posts), false)
    );
  });

  it("should request posts failed", async () => {
    /* mock the request api */
    apiMock.onGet("/posts").reply(400);
    /* dispatch post request */
    sagaTester.dispatch(PostActions.postRequest());
    /* await for request success */
    await sagaTester.waitFor(PostActions.postRequestFailure().type);
    /* expect the action request succes has been called */
    expect(sagaTester.getLatestCalledAction()).toEqual(
      PostActions.postRequestFailure()
    );
  });

  it("should request one post success", async () => {
    /* mock the request api */
    apiMock.onGet(`/posts/${posts[0].id}`).reply(200, posts[0]);
    /* dispatch post request */
    sagaTester.dispatch(PostActions.postRequest(posts[0].category, posts[0].id));
    /* await for request success */
    await sagaTester.waitFor(PostActions.postRequestSuccess().type);
    /* expect the action request succes has been called */
    expect(sagaTester.getCalledActions()).toContainEqual(
      PostActions.postRequestSuccess(arrayToObject([posts[0]]), true)
    );
  });

  it("should request all post of a category success", async () => {
    /* mock the request api */
    apiMock.onGet(`/${posts[0].category}/posts`).reply(200, posts[0]);
    /* dispatch post request */
    sagaTester.dispatch(PostActions.postRequest(posts[0].category));
    /* await for request success */
    await sagaTester.waitFor(PostActions.postRequestSuccess().type);
    /* expect the action request succes has been called */
    expect(sagaTester.getCalledActions()).toContainEqual(
      PostActions.postRequestSuccess(arrayToObject([posts[0]]), false)
    );
  });

  it("should add post", async () => {
    /* mock the api add post */
    apiMock.onPost("/posts").reply(200, posts[0]);
    /* dispatch post save */
    sagaTester.dispatch(PostActions.postSave(posts[0], true));
    /* wait for save success */
    await sagaTester.waitFor(PostActions.postSaveSuccess().type);
    expect(sagaTester.getCalledActions()).toContainEqual(
      PostActions.postSaveSuccess(posts[0])
    );
  });

  it("should update post", async () => {
    /* mock the api add post */
    apiMock.onPut(`/posts/${posts[0].id}`).reply(200, posts[0]);
    /* dispatch post save */
    sagaTester.dispatch(PostActions.postSave(posts[0], false));
    /* wait for save success */
    await sagaTester.waitFor(PostActions.postSaveSuccess().type);
    expect(sagaTester.getCalledActions()).toContainEqual(
      PostActions.postSaveSuccess(posts[0])
    );
  });

  it("should remove post", async () => {
    /* array of actions dispatched */
    const dispatched = [];
    /* my consts */
    const postsObjects = arrayToObject(posts);
    const postId = posts[0].id;
    /* simulate access api */
    sinon.stub(apiPost, "remove").callsFake(() => ({
      ok: true
    }));

    /* run my saga  */
    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ post: { posts: postsObjects } })
      },
      sagas.postRemove,
      { postId }
    ).done;

    /* delete post from my objected */
    delete postsObjects[postId];

    /* expect api has been called with post Id */
    expect(apiPost.remove.calledWith(postId)).toBe(true);
    /* exepct my action success has been called */
    expect(dispatched).toContainEqual(
      PostActions.postRemoveSuccess(postsObjects)
    );
  });

  it("should like or not lik post", async () => {
    /* array of actions dispatched */
    const dispatched = [];
    /* my consts */
    const postId = posts[0].id;
    /* simulate access api */
    sinon.stub(apiPost, "likeNotLike").callsFake(() => ({
      ok: true,
      data: {
        voteScore: 10
      }
    }));

    /* run my saga  */
    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      sagas.postLikeNotLike,
      { postId, voteScore: "upVote" }
    ).done;

    /* expect api has been called with post Id */
    expect(apiPost.likeNotLike.calledWith(postId, { option: "upVote" })).toBe(
      true
    );
    /* exepct my action success has been called */
    expect(dispatched).toContainEqual(
      PostActions.postLikeNotLikeSuccess(postId, 10)
    );
  });
});
