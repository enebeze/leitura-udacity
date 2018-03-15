/* Api Post */
import * as apiPost from "./../../api/apiPost";
import { message } from "antd";
/* Effects redux */
import { call, put, select } from "redux-saga/effects";

/* Actions */
import PostActions from "./../ducks/posts";
import FormActions from "../ducks/form";

import { arrayToObject } from "./../../util/helpers";

export function* postRequest(action) {
  message.loading("Loading posts...", 2000);

  try {
    const response = yield call(
      apiPost.requestPosts,
      action.category,
      action.postId
    );

    if (response.ok) {
      if (Object.keys(response.data).length !== 0) {
        // Create array of posts and object to receive posts
        const arrayPosts = response.data instanceof Array ? response.data : [response.data];
        // Object
        const objectPosts = arrayToObject(arrayPosts);
        // Post Success
        yield put(
          PostActions.postRequestSuccess(
            objectPosts,
            action.postId ? true : false
          )
        );
      }
    }
  } catch (e) {
    // Post Failure
    yield put(PostActions.postRequestFailure());
  } finally {
    setTimeout(message.destroy, 500);
  }
}

export function* postSave(action) {
  // Add or Update
  const func = action.isAdd ? apiPost.add : apiPost.update;
  // Call func
  const response = yield call(func, action.post);

  if (response.ok) {
    // Update store
    yield put(PostActions.postSaveSuccess(response.data));
    yield put(FormActions.changeModal());
  }
}

export function* postRemove(action) {
  // Call Delete func
  const response = yield call(apiPost.remove, action.postId);

  if (response.ok) {
    // Get All posts
    const posts = yield select(p => Object.assign({}, p.post.posts));
    // Remove posts
    delete posts[action.postId];
    // Update Store
    yield put(PostActions.postRemoveSuccess(posts));
    if (action.callback) action.callback();
  }
}

export function* postLikeNotLike(action) {
  // Call Like or Dislike
  const response = yield call(apiPost.likeNotLike, action.postId, {
    option: action.voteScore
  });
  if (response.ok) {
    // Update store
    yield put(
      PostActions.postLikeNotLikeSuccess(action.postId, response.data.voteScore)
    );
  }
}
