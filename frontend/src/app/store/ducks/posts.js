import { createActions, createReducer } from "reduxsauce";
import _ from "lodash";

/* Types & Creators */

const { Types, Creators } = createActions({
  postRequest: ["category", "post_id"],
  postSuccess: ["data"],
  postFailure: null,
  postOrder: ["order"]
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  isDetailsPage: false
};

/* Reducers */

export const request = state => ({
  ...state,
  loading: true
});

export const success = (state, action) => ({
  data: action.data,
  loading: false,
  error: null,
  isDetailsPage: action.isDetailsPage
});

export const failure = () => ({
  data: [],
  loading: false,
  error: true
});

export const order = (state, action) => ({
  ...state,
  data: _.orderBy(state.data, action.order, "desc")
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_SUCCESS]: success,
  [Types.POST_FAILURE]: failure,
  [Types.POST_ORDER]: order
});
