/* Api Comments */
import { requestCommentsByPostId, add, update, remove, likeNotLike } from "./../../api/apiComment";

import { call, put, select, take } from "redux-saga/effects";

/* Actions and Types */
import ActionCreators, { Types as CommentTypes } from "./../ducks/comment";
import { Types as PostTypes } from "./../ducks/posts";

import { arrayToObject } from "./../../util/helpers";

export function* commentRequest(action) {
  while (true) {
    const action = yield take(PostTypes.POST_REQUEST);

    if (action.postId) {
      const response = yield call(requestCommentsByPostId, action.postId);
      
      if (response.ok) {
        // Create array of comments and object to receive comments
        const arrayComments = response.data instanceof Array ? response.data : [response.data];
        // Object
        const objectComments = arrayToObject(arrayComments);
        // Comment Success
        yield put(ActionCreators.commentRequestSuccess(objectComments, action.postId));
      } else {
        // Comment Failure
        yield put(ActionCreators.commentRequestFailure());
      }
    }
  }
}

export function* commentSave(action) {
  // Add or Update
  const func = action.isAdd ? add : update;
  // Call func
  const response = yield call(func, action.comment);

  if (response.ok) {
    // Update store
    yield put(ActionCreators.commentSaveSuccess(response.data));
    // Execute function callback
    action.callback();
  }
}

export function* commentRemove(action) {
  // Call Delete func
  const response = yield call(remove, action.commentId);

  if (response.ok) {
    // Get a copy for all comments
    const comments = yield select(p => Object.assign({}, p.comment.comments));
    // Remove posts
    delete comments[response.data.parentId][action.commentId];
    // Update Store
    yield put(ActionCreators.commentRemoveSuccess(comments));
  }
}

export function* commentLikeNotLike(action) {
  // Call Like or Dislike
  const response = yield call(likeNotLike, action.commentId, { option: action.voteScore });

  if (response.ok) {
    // Update store
    yield put(ActionCreators.commentSaveSuccess(response.data));
  }
}
