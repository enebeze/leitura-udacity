import { combineReducers } from "redux";
import configureStore from "./configureStore";
import rootSaga from "./sagas";

/* Reducers */
import { reducer as post } from "./ducks/posts";
import { reducer as category } from "./ducks/category";
import { reducer as comment } from "./ducks/comment";
import { reducer as form } from "./ducks/form";
import { reducer as auth } from "./ducks/auth";

export default () => {
  // Combine reducers
  const rootReducer = combineReducers({
    post,
    comment,
    category,
    form,
    auth
  });
  // Return configure store with reducers and sagas
  return configureStore(rootReducer, rootSaga);
};
