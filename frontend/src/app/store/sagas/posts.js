/* Api Post */
import {
  requestPosts,
  add,
  update,
  remove,
  likeNotLike
} from "./../../api/apiPost";
import { message } from 'antd';

import { call, put, select, take } from "redux-saga/effects";

/* Types */
import { Types as PostTypes } from "./../ducks/posts";
/* Actions */
import PostActions from "./../ducks/posts";
import FormActions from "../ducks/form";

import { arrayToObject } from "./../../util/helpers";

export function* postRequest(action) {
  
  const response = yield call(requestPosts, action.category, action.postId);

  if (response.ok) {
    // Create array of posts and object to receive posts
    const arrayPosts = response.data instanceof Array ? response.data : [response.data];
    // Object
    const objectPosts = arrayToObject(arrayPosts);
    // Post Success
    yield put(PostActions.postRequestSuccess(objectPosts, action.postId ? true : false)
    );
  } else {
    // Post Failure
    yield put(PostActions.postRequestFailure());
  }
}

export function* postSave(action) {
  // Add or Update
  const func = action.isAdd ? add : update;
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
  const response = yield call(remove, action.postId);

  if (response.ok) {
    // Get All posts
    const posts = yield select(p => Object.assign({}, p.post.posts));
    // Remove posts
    delete posts[action.postId];
    // Update Store
    yield put(PostActions.postRemoveSuccess(posts));
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
      PostActions.postLikeNotLikeSuccess(
        action.postId,
        response.data.voteScore
      )
    );
  }
}

export function* notification() {

  while(true) {
    yield take(PostTypes.POST_SAVE_SUCCESS);

    message.success('Post Save Success');
  }

  
}