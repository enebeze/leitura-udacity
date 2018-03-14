import React from "react";
import { shallow } from "enzyme";
import Header from "../../app/components/Header";

import { auth } from "../../app/firebase";

import configureStore from "redux-mock-store";

/* Mock store */
const mockStore = configureStore();

/* store */
const store = mockStore({ auth: { user: { }}});

import { MockFirebase } from "firebase-mock";

describe("Testing Header", () => {
  it("renders as aspected", () => {
    auth.doSignOut = jest.fn().mockReturnValue({

    });
    const wrapper = shallow(<Header />, { context: { store } }).dive();
    expect(wrapper.children().children()).toHaveLength(2);
  });
});
