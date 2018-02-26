import { getAllCategories } from "./../../api/apiCategory";

import { call, put } from "redux-saga/effects";
import ActionCreators from "./../ducks/category";

export function* categoryRequest() {
  // Access api
  const response = yield call(getAllCategories);
  // Check return
  if (response.ok) {
    // Change property name of object
    var categories = [{ text: "All", value: "" }].concat(
      response.data.categories.map(a => ({ text: a.name, value: a.path }))
    );
    // Action success
    yield put(ActionCreators.categoryRequestSuccess(categories));
  }
};
