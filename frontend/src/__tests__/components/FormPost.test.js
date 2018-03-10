import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";

/* Redux actions */
import PostActions from "../../app/store/ducks/posts";
import FormActions from "../../app/store/ducks/form";

/* Components */
import FormPost from "../../app/components/FormPost";

/* Mock store */
const mockStore = configureStore();

/* data json */
const datas = require("../data/posts.json");

/* consts */
const post = datas.post;

const initialState = {
  form: { postEdit: post },
  category: {}
};

/* store */
const store = mockStore(initialState);

/* Component post */
function createWrapper() {
  return shallow(<FormPost />, { context: { store } }).dive();
}

let wrapper;

beforeEach(() => {
  wrapper = createWrapper();
});

describe("Testing form post", () => {
  it("should dispatch showModal on click cancel", () => {
    /* simulate click cancel */
    wrapper.find("#cancel").simulate("click");
    /* my expect */
    expect(store.getActions()).toContainEqual(FormActions.changeModal());
  });

  it("should dispatch save post on form submit update", () => {
    /* simulate submit */
    wrapper.find("#form_save").simulate("submit");
    const postEdit = { id: post.id, title: post.title, body: post.body };
    /* my expect */
    expect(store.getActions()).toContainEqual(
      PostActions.postSave(postEdit, false)
    );
  });

  it("should dispatch save post on form submit add", () => {
    post.id = undefined;
    /* simulate click save */
    wrapper.find("#form_save").simulate("submit");

    /* my expect */
    expect(store.getActions()).toContainEqual(PostActions.postSave(post, true));
  });

  it("should check category to save post", () => {
    post.category = "";
    /* simulate submit click */
    wrapper.find("#form_save").simulate("submit");
    /* exepct state change */
    expect(wrapper.instance().state.categoryError).toBe(true);
  });

  it("should change postEdit on handleChange", () => {
    /* param to test */
    const param = { name: "title", value: "New Post" };
    /* run func */
    wrapper.instance().handleChange(null, param);
    /* my expect */
    expect(store.getActions()).toContainEqual(
      FormActions.handleChange(param.name, param.value)
    );
  });

  it("fields disabled when id null", () => {
    expect(wrapper.find("#author").prop("disabled")).toBe(true);
    expect(wrapper.find("#category").prop("disabled")).toBe(true);
  });

  it("fields enabled when id null", () => {
    post.id = undefined;
    const wrapper = createWrapper();
    expect(wrapper.find("#author").prop("disabled")).toBe(false);
    expect(wrapper.find("#category").prop("disabled")).toBe(false);
  });
});
