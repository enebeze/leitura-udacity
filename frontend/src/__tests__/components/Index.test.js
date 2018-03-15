import React from "react";
import { shallow } from "enzyme";
import App from "../../app";

import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

jest.mock('../../app/firebase/firebase', () => {

  const firebasemock = require('firebase-mock');
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(null, mockauth)
  const firebase = mocksdk.initializeApp();
  // return the mock to match your export api
  return firebase;
});

describe("Testing App", () => {

  it("renders as aspected", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Provider)).toHaveLength(1);
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(1);
  });  
});
