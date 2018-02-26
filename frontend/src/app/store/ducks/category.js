import { createActions, createReducer } from "reduxsauce";

/* Types & Creators */

const { Types, Creators } = createActions({
  categoryRequest: null,
  categoryRequestSuccess: ["categories"],
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  categories: [],
};

/* Reducers */

export const success = (state, action) => ({
  categories: action.categories,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: null,
  [Types.CATEGORY_REQUEST_SUCCESS]: success,
});
