import React, { Component } from "react";

import { Menu, Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

import { connect } from "react-redux";

class Header extends Component {
  render() {
    const user = this.props.user;

    return (
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
            {user ? (
              <Button
                primary
                style={{ marginLeft: "0.5em" }}
                onClick={() => {
                  auth.doSignOut();
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/Login">Sign Up</Link>
            )}
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Header);
