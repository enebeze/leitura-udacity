import FormActions, { reducer } from "../../app/store/ducks/form";

const post = require("../data/posts.json").post;

describe("Testing form reducer", () => {
  it("can change modal show", () => {
    /* create state */
    const state = reducer({ showModal: false }, FormActions.changeModal(post));
    /* my expect */
    expect(state).toEqual({ showModal: true, postEdit: post });
  });

  it("can change modal hide", () => {
    /* create state */
    const state = reducer({ showModal: true }, FormActions.changeModal());
    /* my expect */
    expect(state).toEqual({
      showModal: false,
      postEdit: {
        title: "",
        author: "",
        category: "",
        body: ""
      }
    });
  });

  it("can handle change", () => {
    /* update title for post */
    let state = reducer(
      { postEdit: post },
      FormActions.handleChange("title", "New Title")
    );
    /* my expect */
    expect(state.postEdit.title).toBe("New Title");
    expect(state.postEdit.body).toBe(post.body);
    /* update body */
    state = reducer(state, FormActions.handleChange("body", "New Body"));
    expect(state.postEdit.body).toBe("New Body");
  });
});
