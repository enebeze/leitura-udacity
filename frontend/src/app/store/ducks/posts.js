import { createActions, createReducer } from "reduxsauce";
import _ from "lodash";
import { postsToObject } from "./../../util/helpers";

/* Types & Creators */

const { Types, Creators } = createActions({
  /* Request */
  postRequest: ["category", "post_id"],
  postRequestSuccess: ["posts", "isDetailsPage"],
  postRequestFailure: null,

  /* Save (Add/Update) */
  postSave: ["post", "isAdd"],
  postSaveSuccess: ["post"],
  //postSaveFailure: null,

  /* Outhers */
  postOrder: ["order"],
  changeModal: ["postEdit"]
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  posts: {},
  loading: false,
  error: false,
  isDetailsPage: false,
  showModal: false,
  postEdit: null,
  orderBy: "timestamp"
};

/* Reducers */

export const request = state => ({
  ...state,
  loading: true
});

export const success = (state, action) => ({
  ...state,
  posts: action.posts,
  isDetailsPage: action.isDetailsPage,
  loading: false,
  error: null,
});

export const failure = state => ({
  ...state,
  posts: [],
  loading: false,
  error: true
});

/* Save (Add/Update) */
export const saveSuccess = (state, action) => ({
  ...state,
  posts: {...state.posts, [action.post.id]: action.post },
  showModal: !state.showModal,
  postEdit: null,
});

/* Outher */

export const order = (state, action) => ({
  ...state,
  orderBy: action.order,
  posts: postsToObject(_.orderBy(state.posts, action.order, "desc"))
});

export const changeModal = (state, action) => ({
  ...state,
  showModal: !state.showModal,
  postEdit: action.postEdit
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_REQUEST_SUCCESS]: success,
  [Types.POST_REQUEST_FAILURE]: failure,

  [Types.POST_SAVE]: null,
  [Types.POST_SAVE_SUCCESS]: saveSuccess,

  [Types.POST_ORDER]: order,
  [Types.CHANGE_MODAL]: changeModal,
});
