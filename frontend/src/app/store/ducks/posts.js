import { createActions, createReducer } from "reduxsauce";

/* Types & Creators */

const { Types, Creators } = createActions({
  /* Request */
  postRequest: ["category", "postId"],
  postRequestSuccess: ["posts", "isDetailsPage"],
  postRequestFailure: null,

  /* Save (Add/Update) */
  postSave: ["post", "isAdd"],
  postSaveSuccess: ["post"],

  /* Remove */
  postRemove: ["postId", "callback"],
  postRemoveSuccess: ["posts"],

  /* Like or Not Like */
  postLikeNotLike: ["postId", "voteScore"],
  postLikeNotLikeSuccess: ["postId", "voteScore"],

  /* Order */
  postOrder: ["order"],
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  posts: {},
  error: false,
  isDetailsPage: false,
  orderBy: "timestamp"
};

/* Reducers */

export const success = (state, action) => ({
  ...state,
  posts: action.posts,
  isDetailsPage: action.isDetailsPage,
  error: null
});

export const failure = state => ({
  ...state,
  posts: {},
  error: true
});

/* Save (Add/Update) */
export const saveSuccess = (state, action) => ({
  ...state,
  posts: { ...state.posts, [action.post.id]: action.post },
  showModal: !state.showModal,
  postEdit: null
});

/* Delete Post */
export const removeSuccess = (state, action) => ({
  ...state,
  posts: action.posts
});

export const likeNotLikeSuccess = (state, action) => ({
  ...state,
  posts: {
    ...state.posts,
    [action.postId]: {
      ...state.posts[action.postId],
      voteScore: action.voteScore
    }
  }
});

/* order */

export const order = (state, action) => ({
  ...state,
  orderBy: action.order,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: null,
  [Types.POST_REQUEST_SUCCESS]: success,
  [Types.POST_REQUEST_FAILURE]: failure,

  [Types.POST_SAVE]: null,
  [Types.POST_SAVE_SUCCESS]: saveSuccess,

  [Types.POST_REMOVE]: null,
  [Types.POST_REMOVE_SUCCESS]: removeSuccess,

  [Types.POST_LIKE_NOT_LIKE]: null,
  [Types.POST_LIKE_NOT_LIKE_SUCCESS]: likeNotLikeSuccess,

  [Types.POST_ORDER]: order,
});
