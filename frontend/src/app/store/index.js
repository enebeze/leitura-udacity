import { combineReducers } from "redux";
import configureStore from "./configureStore";
import rootSaga from "./sagas";

/* Reducers */
import { reducer as post } from "./ducks/posts";
import { reducer as category } from "./ducks/category";

export default () => {
  const rootReducer = combineReducers({
    post,
    category,
  });

  return configureStore(rootReducer, rootSaga);
};
