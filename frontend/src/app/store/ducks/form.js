import { createActions, createReducer } from "reduxsauce";

/* Types & Creators */

const { Types, Creators } = createActions({
  changeModal: ["postEdit"],
  handleChange: ["name", "value"]
});

export { Types };
export default Creators;

const postEdit = {
  title: "",
  author: "",
  category: "",
  body: ""
};

/* Initial State */
const INITIAL_STATE = {
  showModal: false,
  postEdit: postEdit
};

/* Reducers */

export const changeModal = (state, action) => ({
  showModal: !state.showModal,
  postEdit: action.postEdit || postEdit
});

export const handleChange = (state, action) => ({
  ...state,
  postEdit: { ...state.postEdit, [action.name]: action.value }
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_MODAL]: changeModal,
  [Types.HANDLE_CHANGE]: handleChange
});
