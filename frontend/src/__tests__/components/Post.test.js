import React from "react";
import { shallow, mount } from "enzyme";

import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const initialState = {
    comment: {
        comments: []
    }
};

/* Component Post */
import Post from "../../app/components/Post";

describe("Testing component post", () => {
  const store = mockStore(initialState);

  it("render post as expected", () => {
    const wrapper = shallow(<Post post={{ title: "Meu", category: "redux", id: "1"}} />, { context: { store } });
    console.log(expect(wrapper.find('#title')));
    //wrapper.setState({ post: { id: 1, title: "Meu Post" } });
    //expect(wrapper.find('#title').length).toBe(1)
  });
});
