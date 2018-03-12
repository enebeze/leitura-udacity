import SagaTester from "redux-saga-tester";
import MockAdapter from "axios-mock-adapter";
import api from "../../app/api/api";
import rootSaga from "../../app/store/sagas";
import CategoryAction from "../../app/store/ducks/category";

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
    /* dispatch category request */
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
