import React from "react";
import { shallow } from "enzyme";

import Header from "../../app/components/Header";
import { Menu, Container, Image, Button } from 'semantic-ui-react'


describe("Testing Header", () => {

    it("renders as aspected", () => {

        const wrapper = shallow(<Header />);
        expect(wrapper.children().children()).toHaveLength(2);
    })
})

// test("ola", () => { });