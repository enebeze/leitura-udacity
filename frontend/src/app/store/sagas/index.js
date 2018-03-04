import { takeLatest, fork } from "redux-saga/effects";

/* Types */
import { Types as PostTypes } from "./../ducks/posts";
import { Types as CommentTypes } from "./../ducks/comment";
import { Types as CategoryTypes } from "./../ducks/category";

/* Sagas */
import {
  postRequest,
  postSave,
  postRemove,
  postLikeNotLike,
  notification
} from "./posts";

import { commentRequest, commentSave, commentRemove, commentLikeNotLike } from "./comment";
import { categoryRequest } from "./category";

export default function* root() {
  yield [
    /* Posts */
    takeLatest(PostTypes.POST_REQUEST, postRequest),
    takeLatest(PostTypes.POST_SAVE, postSave),
    takeLatest(PostTypes.POST_REMOVE, postRemove),
    takeLatest(PostTypes.POST_LIKE_NOT_LIKE, postLikeNotLike),
    fork(notification),

    /* Comments */
    fork(commentRequest),
    takeLatest(CommentTypes.COMMENT_SAVE, commentSave),
    takeLatest(CommentTypes.COMMENT_REMOVE, commentRemove),
    takeLatest(CommentTypes.COMMENT_LIKE_NOT_LIKE, commentLikeNotLike),

    /* Category */
    takeLatest(CategoryTypes.CATEGORY_REQUEST, categoryRequest),
  ];
}
