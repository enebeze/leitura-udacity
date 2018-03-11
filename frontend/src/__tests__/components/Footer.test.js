import React from "react";
import { shallow } from "enzyme";
import Footer from "../../app/components/Footer";

import { Segment, Container, Divider } from 'semantic-ui-react';

describe("Testing Footer", () => {
  it("renders as aspected", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(Segment)).toHaveLength(1);
    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Divider)).toHaveLength(1);
  });  
});
