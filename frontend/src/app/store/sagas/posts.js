/* Api Post */
import {
  requestPosts,
  add,
  update,
  remove,
  likeNotLike
} from "./../../api/apiPost";

import { call, put, select, take } from "redux-saga/effects";

/* Types */
import { Types as PostTypes } from "./../ducks/posts";
/* Actions */
import ActionCreators from "./../ducks/posts";

import { postsToObject } from "./../../util/helpers";
import _ from "lodash";

export function* postRequest(action) {
  const response = yield call(requestPosts, action.category, action.postId);
  if (response.ok) {
    // Create array of posts and object to receive posts
    const arrayPosts = response.data instanceof Array ? response.data : [response.data];
    // Object
    const objectPosts = postsToObject(arrayPosts);
    // Post Success
    yield put(ActionCreators.postRequestSuccess(objectPosts, action.postId ? true : false)
    );
  } else {
    // POst Failure
    yield put(ActionCreators.postRequestFailure());
  }
}

export function* postSave(action) {
  // Add or Update
  const func = action.isAdd ? add : update;
  // Call func
  const response = yield call(func, action.post);

  if (response.ok) {
    // Update store
    yield put(ActionCreators.postSaveSuccess(response.data));
  }
}

export function* postRemove(action) {
  // Call Delete func
  const response = yield call(remove, action.postId);

  if (response.ok) {
    // Get All posts
    const posts = yield select(p => p.post.posts);
    // Remove posts
    delete posts[action.postId];
    // Update Store
    yield put(ActionCreators.postRemoveSuccess(posts));
  }
}

export function* postLikeNotLike(action) {
  // Call Like or Dislike
  const response = yield call(likeNotLike, action.postId, {
    option: action.voteScore
  });
  if (response.ok) {
    // Update store
    yield put(
      ActionCreators.postLikeNotLikeSuccess(
        action.postId,
        response.data.voteScore
      )
    );
  }
}

export function* postOrder() {
  while (true) {
    const action = yield take([
      PostTypes.POST_REQUEST_SUCCESS,
      PostTypes.POST_SAVE_SUCCESS,
      PostTypes.POST_LIKE_NOT_LIKE_SUCCESS
    ]);
    
    // Reorder
    const order = yield select(p => p.post.orderBy);
    yield put(ActionCreators.postOrder(order));
  }
}
