import React, { Component } from "react";
import { Link } from "react-router-dom";

/* firebase auth */
import { firebaseUi, uiConfig } from "../firebase/firebase";

class Login extends Component {

  componentDidMount() {
    
    /* config firebase login */
    firebaseUi.start("#firebaseui-auth-container", uiConfig);
  }

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
              skip sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
