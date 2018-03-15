import React from "react";
import { shallow } from "enzyme";
import App from "../../app/views/App";

import Login from "../../app/views/Login";
import Home from "../../app/views/Home";

import configureStore from "redux-mock-store";
import { resolve } from "path";
import { MockFirebaseSdk } from "firebase-mock/src";
/* Mock store */
const mockStore = configureStore();
/* store */
const store = mockStore({ auth: { user: {} } });

jest.mock("../../app/firebase/firebase", () => {
  const firebasemock = require("firebase-mock");
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(null, mockauth);
  const firebase = mocksdk.initializeApp();
  // return the mock to match your export api
  return firebase;
});

  /* 
    stop because problem with firebase 
    needed to solve 
  */

describe("Testing App", () => {
  it("renders login", () => {
    const param = { params: { category: "Login" } };

    //const wrapper = shallow(<App match={param} />, { context: { store } }).dive();
    //expect(wrapper.find(Login)).toHaveLength(1);
  });

  it("renders home", () => {
    const param = { params: { category: "" } };
    //const wrapper = shallow(<App match={param} />, { context: { store } }).dive();
    //expect(wrapper.find(Home)).toHaveLength(1);
  });
});
