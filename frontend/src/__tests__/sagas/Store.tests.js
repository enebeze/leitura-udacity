import createStore from "../../app/store";

const stateInitial = {
  post: {
    posts: {},
    error: false,
    isDetailsPage: false,
    orderBy: "timestamp"
  },
  comment: { comments: {} },
  category: { categories: [] },
  form: {
    showModal: false,
    postEdit: { title: "", author: "", category: "", body: "" }
  }
};

describe("Testing store saga", () => {
  it("should create store", () => {
    /* create store */
    const store = createStore();
    /* my expect */
    expect(store.getState()).toEqual(stateInitial);
  });
});
