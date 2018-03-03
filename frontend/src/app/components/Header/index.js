import React from "react";

import { Menu, Container, Image, Dropdown, Button } from 'semantic-ui-react'

const Header = () => (
  <Menu style={{ background: "#02acfe" }} fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        <Image
          size="mini"
          src="/favicon.ico"
          style={{ marginRight: "1.5em" }}
        />
        Leitura Udacity by Ebenézer
      </Menu.Item>

      <Menu.Item position="right">
        <Button as="a" primary style={{ marginLeft: "0.5em" }}>
          Sign Up
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
);

export default Header;