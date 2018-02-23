import { combineReducers } from "redux";
import configureStore from "./configureStore";
import rootSaga from "./sagas";

/* Reducers */
import { reducer as post } from "./ducks/posts";

export default () => {
  const rootReducer = combineReducers({
    post
  });

  return configureStore(rootReducer, rootSaga);
};
