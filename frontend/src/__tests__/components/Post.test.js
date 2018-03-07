import React from "react";
import { shallow } from "enzyme";

import configureStore from "redux-mock-store";
import PostActions from "../../app/store/ducks/posts";

import { Link } from "react-router-dom";
import CommentPost from "../../app/components/CommentPost";

import {
  Item,
  Header,
  Comment,
  Form,
  Button,
  Label,
  Icon,
  Dropdown,
  Divider
} from "semantic-ui-react";

/* Component Post */
import Post from "../../app/components/Post";

const mockStore = configureStore([]);

const initialState = {
  comment: {
    comments: {
      1: {
        1: {
          id: 1,
          author: "autho",
          body: "body",
          voteScore: 1
        },
        2: {
          id: 2,
          author: "autho",
          body: "body",
          voteScore: 1
        }
      }
    }
  }
};

const post = {
  id: 1,
  title: "New Post",
  author: "author",
  category: "redux",
  body: "body"
};

/* Mock store */
const store = mockStore(initialState);

/* Component post */
function createWrapper() {
  return shallow(<Post post={post} />, { context: { store } });
}

describe("Testing component post", () => {

  it("render link to details", () => {
    const wrapper = createWrapper();
    /* Test values render */
    expect(
      wrapper
        .dive()
        .find(Link)
        .prop("to")
    ).toContain(`/${post.category}/${post.id}`);
  });

  it("render comments as expected", () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().find(CommentPost)).toHaveLength(2);
  });

  it("button back only details page", () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().find("#back")).toHaveLength(0);
    wrapper.setProps({ isDetailsPage: true });
    expect(wrapper.dive().find("#back")).toHaveLength(1);
  });

  it("form add comments only details page", () => {
    const wrapper = createWrapper();

    expect(wrapper.dive().find(Form)).toHaveLength(0);
    wrapper.setProps({ isDetailsPage: true });
    expect(wrapper.dive().find(Form)).toHaveLength(1);
  });

  
});

describe("Testing actions posts", () => {

  it("should edit post", () => {
    const wrapper = createWrapper();

    wrapper
      .dive()
      .find("#edit")
      .simulate("click");
    expect(store.getActions()).toContainEqual(PostActions.changeModal(post));
  });

  it("should remove post", () => {
    const wrapper = createWrapper();

    wrapper
      .dive()
      .find("#delete")
      .simulate("click");

    console.log(wrapper
      .dive()
      .find("#delete").prop("onClick"))

      // https://stackoverflow.com/questions/38348110/test-react-confirmation-window-using-enzyme
    //expect(store.getActions()).toContainEqual(PostActions.postRemove(post.id));
  });

})
