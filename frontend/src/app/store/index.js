import { combineReducers } from "redux";
import configureStore from "./configureStore";
import rootSaga from "./sagas";

/* Reducers */
import { reducer as post } from "./ducks/posts";
import { reducer as category } from "./ducks/category";
import { reducer as comment } from "./ducks/comment";

export default () => {
  // Combine reducers
  const rootReducer = combineReducers({
    post,
    comment,
    category,
  });
  // Return configure store with reducers and sagas
  return configureStore(rootReducer, rootSaga);
};
