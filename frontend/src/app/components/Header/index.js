import React, { Component } from "react";

import { Menu, Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

import AuthActions from "../../store/ducks/auth";

import { connect } from "react-redux";

class Header extends Component {
  logout = () => {
    auth.doSignOut();
    this.props.logout();
  };

  render() {
    const user = this.props.user;

    return (
      <Menu style={{ background: "#02acfe" }} fixed="top" inverted>
        <Container>
          <Menu.Item>
            <Link to="/">Leitura Udacity by Ebenézer</Link>
          </Menu.Item>

          {user && (
            <Menu.Item>
              <Image
                avatar
                size="mini"
                src={user ? user.photoURL : ``}
                style={{ marginRight: "1.5em" }}
              />
              Welcome {user.author}
            </Menu.Item>
          )}

          <Menu.Item position="right">
            {user ? (
              <Button
                primary
                style={{ marginLeft: "0.5em" }}
                onClick={this.logout}>
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

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AuthActions.authLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
