import React, { Component } from "react";
import { Link } from "react-router-dom";

/* firebase auth */
import { firebaseUi, createUiConfig } from "../firebase/firebase";

/* Actions */
import AuthActions from "../store/ducks/auth";
/* connect redux */
import { connect } from "react-redux";

class Login extends Component {
  componentDidMount() {
    const uiConfig = createUiConfig(this.signInSuccess);

    /* config firebase login */
    firebaseUi.start("#firebaseui-auth-container", uiConfig);
  }

  signInSuccess = currentUser => {
    /* create user */
    const user = {
      author: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL
    };
    /* Save user on store */
    this.props.login(user);

    const { history } = this.props;
    /* go home */
    history.push("/");
  };

  render() {
    return (
      <div>
        <div id="page-splash">
          <h3 className="fp-logo">Welcome to the Udacity Reading!</h3>
          <div className="fp-caption">
            The Web App to allow users to post content in pre-defined
            categories.
          </div>
          <div className="fp-signed-out-only fp-initially-hidden">
            <div
              id="firebaseui-auth-container"
              className="fp-signed-out-only fp-initially-hidden"
            />
            <Link className="fp-skip" to="/">
              {this.props.user
                ? `You are already logged in as ${this.props.user.author}. Click here to go home!`
                : `skip sign in`}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(AuthActions.authLogin(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
