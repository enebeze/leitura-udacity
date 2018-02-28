/* Api Post */
import { getPosts, add, update } from "./../../api/apiPost";

import { call, put, select } from "redux-saga/effects";
import ActionCreators from "./../ducks/posts";

import { postsToObject } from "./../../util/helpers";
import _ from "lodash";

export function* postRequest(action) {
  const response = yield call(getPosts, action.category, action.post_id);
  if (response.ok) {
    // Create array of posts and object to receive posts
    const arrayPosts = response.data instanceof Array ? response.data : [response.data];
    // Get order by value from state
    const order = yield select(p => p.post.orderBy);
    // Object order 
    const objectPosts = postsToObject(_.orderBy(arrayPosts, order, "desc"))
    // Post Success
    yield put(ActionCreators.postRequestSuccess(objectPosts, action.post_id ? true : false));
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
