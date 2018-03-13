import { createActions, createReducer } from "reduxsauce";

/* Types & Creators */

const { Types, Creators } = createActions({
  authLogin: ["user"],
  authLogout: null
});

export { Types };
export default Creators;

/* Initial State */
const INITIAL_STATE = {
  user: null
};

/* Reducers */

export const login = (state, action) => ({ user: action.user });
export const logout = (state) => ({ user: null });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_LOGIN]: login,
  [Types.AUTH_LOGOUT]: logout,
});
