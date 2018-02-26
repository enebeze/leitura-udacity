import { createActions, createReducer } from "reduxsauce";
import _ from "lodash";

/* Types & Creators */

const { Types, Creators } = createActions({
  /* Request */
  postRequest: ["category", "post_id"],
  postSuccess: ["posts", "isDetailsPage"],
  postFailure: null,

  /* Save (Add/Update) */
  postSave: ["post", "isAdd"],
  postAddSuccess: ["post"],
  postUpdateSuccess: ["post"],
  //postSaveFailure: null,


  /* Outhers */
  postOrder: ["order"],
  changeModal: ["postEdit"]
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: false,
  isDetailsPage: false,
  showModal: false,
  postEdit: null,
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
export const addSuccess = (state, action) => ({
  ...state,
  posts: [...state.posts, action.post]
});

export const updateSuccess = (state, action) => ({
  ...state,
  posts: state.posts.filter(p => p.id !== action.post.id)
          .push(action.post),
});

/* Outher */

export const order = (state, action) => ({
  ...state,
  posts: _.orderBy(state.posts, action.order, "desc")
});

export const changeModal = (state, action) => ({
  ...state,
  showModal: !state.showModal,
  postEdit: action.postEdit
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_SUCCESS]: success,
  [Types.POST_FAILURE]: failure,

  [Types.POST_SAVE]: null,
  [Types.POST_ADD_SUCCESS]: addSuccess,
  [Types.POST_UPDATE_SUCCESS]: updateSuccess,

  [Types.POST_ORDER]: order,
  [Types.CHANGE_MODAL]: changeModal,
});
