/* Api Comments */
import * as apiComment from "./../../api/apiComment";
/* effects redux */
import { call, put, select, take } from "redux-saga/effects";

/* Actions and Types */
import CommentActions from "./../ducks/comment";
import { Types as PostTypes } from "./../ducks/posts";

import { arrayToObject } from "./../../util/helpers";

/* get posts from state */
const getStatePosts = state => {
  if (state.post) return state.post.posts;
  else return { }
}

export function* commentRequest(action) {

  while (true) {
    
    yield take(PostTypes.POST_REQUEST_SUCCESS);

    /* get posts from state */
    const posts = yield select(getStatePosts);

    /* new objeto to comments */
    const comments = {};

    for (const postId in posts) {

      /* get comments from post */
      const response = yield call(apiComment.requestCommentsByPostId, postId);

      if (response.ok) {
        /* Comments object */
        const objectComments = arrayToObject(response.data);
        /* Add to object  */
        comments[postId] = objectComments;
      }
    }

    // Update state comments
    yield put(CommentActions.commentRequestSuccess(comments)); 
  }
}

export function* commentSave(action) {
  /* Add or Update */
  const func = action.isAdd ? apiComment.add : apiComment.update;
  /* Call func */
  const response = yield call(func, action.comment);

  if (response.ok) {
    // Update store
    yield put(CommentActions.commentSaveSuccess(response.data));
    // Execute function callback
    if (action.callback) action.callback();
  }
}

export function* commentRemove(action) {
  // Call Delete func
  const response = yield call(apiComment.remove, action.commentId);

  if (response.ok) {
    // Get a copy for all comments
    const comments = yield select(p => Object.assign({}, p.comment.comments));
    // Remove comment
    delete comments[response.data.parentId][action.commentId];
    // Update Store
    yield put(CommentActions.commentRemoveSuccess(comments));
  }
}

export function* commentLikeNotLike(action) {
  // Call Like Not Dislike
  const response = yield call(apiComment.likeNotLike, action.commentId, { option: action.voteScore });

  if (response.ok) {
    // Update store
    yield put(CommentActions.commentSaveSuccess(response.data));
  }
}
