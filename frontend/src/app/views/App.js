import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";

import { auth } from "../firebase/firebase";

/* Actions */
import AuthActions from "../store/ducks/auth";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    let self = this;
    auth.onAuthStateChanged(function(currentUser) {
      if (currentUser) {
        /* create user */
        const user = {
          author: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        };
        /* Save user on store */
        self.props.login(user);
        self.setState({ isLogin: true });
      }
    });
  }

  render() {
    const { match: { params } } = this.props;

    return params.category === "Login" ? (
      <Login history={this.props.history} />
    ) : (
      <Home
        category={params.category}
        postId={params.postId}
        history={this.props.history}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(AuthActions.authLogin(user))
});

export default connect(null, mapDispatchToProps)(App);
