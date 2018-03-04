import { createActions, createReducer } from "reduxsauce";

/* Types & Creators */

const { Types, Creators } = createActions({
  /* Request */
  commentRequestSuccess: ["comments"],

  /* Save (Add/Update) */
  commentSave: ["comment", "isAdd", "callback"],
  commentSaveSuccess: ["comment"],

  /* Remove */
  commentRemove: ["commentId"],
  commentRemoveSuccess: ["comments"],

  commentClear: null,

  /* Like or Not Like */
  commentLikeNotLike: ["commentId", "voteScore"],
  commentLikeNotLikeSuccess: ["comment"]

});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  comments: {}
};

/* Reducers */

export const requestSuccess = (state, action) => ({
  comments: action.comments
});

/* Save (Add/Update) */
export const saveSuccess = (state, action) => ({
  comments: {
    ...state.comments,
    [action.comment.parentId]: {
      ...state.comments[action.comment.parentId],
      [action.comment.id]: action.comment
    }
  }
});

/* Delete Post */
export const removeSuccess = (state, action) => ({
    comments: action.comments
});

export const clear = (state, action) => INITIAL_STATE;


export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMMENT_REQUEST_SUCCESS]: requestSuccess,

  [Types.COMMENT_SAVE]: null,
  [Types.COMMENT_SAVE_SUCCESS]: saveSuccess,

  [Types.COMMENT_REMOVE]: null,
  [Types.COMMENT_REMOVE_SUCCESS]: removeSuccess,

  [Types.COMMENT_CLEAR]: clear,

  [Types.COMMENT_LIKE_NOT_LIKE]: null,

});
