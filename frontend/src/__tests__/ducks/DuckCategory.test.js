import CategoryActions, { reducer } from "../../app/store/ducks/category";

const categories = [
  {
    text: "All",
    value: ""
  },
  {
    text: "react",
    value: "react"
  },
  {
    text: "redux",
    value: "redux"
  },
  {
    text: "udacity",
    value: "udacity"
  }
];

describe("Testing category reducer", () => {
  it("can request category success", () => {
      /* state initial */
    const stateInitial = { categories: [] }
    /* create state */
    let state = reducer(stateInitial);
    /* expect not has categories */
    expect(state.categories).toEqual([]);
    /* update category with reducers */
    state = reducer(state, CategoryActions.categoryRequestSuccess(categories));
    /* expect categories has been changed */
    expect(state.categories).toEqual(categories)
  });
});
