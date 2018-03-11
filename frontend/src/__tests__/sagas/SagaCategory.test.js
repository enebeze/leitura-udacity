import { runSaga } from "redux-saga";
import SagaTester from "redux-saga-tester";
import MockAdapter from "axios-mock-adapter";
import sinon from "sinon";
import * as apiCategory from "../../app/api/apiPost";
import api from "../../app/api/api";
import rootSaga from "../../app/store/sagas";
import CategoryAction, { reducer } from "../../app/store/ducks/category";

const categories = {
  categories: [
    {
      name: "react",
      path: "react"
    },
    {
      name: "redux",
      path: "redux"
    },
    {
      name: "udacity",
      path: "udacity"
    }
  ]
};

describe("Testing saga category", () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it("should request category success", async () => {
    /* mock the request api */
    apiMock.onGet("/categories").reply(200, categories);
    /* dispatch post request */
    sagaTester.dispatch(CategoryAction.categoryRequest());
    /* await for request success */
     await sagaTester.waitFor(CategoryAction.categoryRequestSuccess().type);
     const cat = [{ text: "All", value: "" }].concat(
        categories.categories.map(a => ({ text: a.name, value: a.path }))
      );
     /* expect the action request succes has been called */
     expect(sagaTester.getLatestCalledAction()).toEqual(
       CategoryAction.categoryRequestSuccess(cat)
     );
  });
});
