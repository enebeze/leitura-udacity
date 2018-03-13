import React from "react";

import { Menu, Container, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";


const Header = () => (
  
  <Menu style={{ background: "#02acfe" }} fixed="top" inverted>
    <Container>
      <Menu.Item header>
        <Image
          size="mini"
          src="/favicon.ico"
          style={{ marginRight: "1.5em" }}
        />
        <Link to="/">Leitura Udacity by Ebenézer</Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link to="/Login" >Sign Up</Link> 
      </Menu.Item>
    </Container>
  </Menu>
);

export default Header;