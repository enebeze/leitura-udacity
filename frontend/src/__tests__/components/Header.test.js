import React from "react";
import { shallow } from "enzyme";
import Header from "../../app/components/Header";

import configureStore from "redux-mock-store";

/* Mock store */
const mockStore = configureStore();

/* store */
const store = mockStore({ auth: { user: { }}});

jest.mock('../../app/firebase/firebase', () => {

  const firebasemock = require('firebase-mock');
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(null, mockauth)
  const firebase = mocksdk.initializeApp();
  // return the mock to match your export api
  return firebase;
});

describe("Testing Header", () => {
  it("renders as aspected", () => {
    const wrapper = shallow(<Header />, { context: { store } }).dive();
    expect(wrapper.children().children()).toHaveLength(3);
  });
});
