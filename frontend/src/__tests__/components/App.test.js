import React from "react";
import { shallow } from "enzyme";
import App from "../../app";

import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

describe("Testing App", () => {

  it("renders as aspected", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Provider)).toHaveLength(1);
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(1);
  });  
});
