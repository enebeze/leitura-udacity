import { takeLatest, fork, all } from "redux-saga/effects";

/* Types */
import { Types as PostTypes } from "./../ducks/posts";
import { Types as CommentTypes } from "./../ducks/comment";
import { Types as CategoryTypes } from "./../ducks/category";

/* Sagas */
import * as SagasPost from "./posts";
import * as SagasComment from "./comment";
import * as SagasCategory from "./category";
import * as SagasNotification from "./notification";

export default function* root() {
  yield all([
    /* Posts */
    takeLatest(PostTypes.POST_REQUEST, SagasPost.postRequest),
    takeLatest(PostTypes.POST_SAVE, SagasPost.postSave),
    takeLatest(PostTypes.POST_REMOVE, SagasPost.postRemove),
    takeLatest(PostTypes.POST_LIKE_NOT_LIKE, SagasPost.postLikeNotLike),

    /* Comments */
    fork(SagasComment.commentRequest),
    takeLatest(CommentTypes.COMMENT_SAVE, SagasComment.commentSave),
    takeLatest(CommentTypes.COMMENT_REMOVE, SagasComment.commentRemove),
    takeLatest(CommentTypes.COMMENT_LIKE_NOT_LIKE, SagasComment.commentLikeNotLike),

    /* Category */
    takeLatest(CategoryTypes.CATEGORY_REQUEST, SagasCategory.categoryRequest),

    /* Notification */
    fork(SagasNotification.notification)
  ]);
}
