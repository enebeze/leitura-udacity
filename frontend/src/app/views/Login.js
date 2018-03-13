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
            {/* <div style={{
                marginBottom: 25
            }} >
              <Button content="facebook" color='facebook' icon='facebook' />
              <Button content="google" color='google plus' icon='google plus' />
            </div> */}
            <Link className="fp-skip" to="/">
              skip sign in
            </Link>
          </div>
          {/* <div className="fp-note">
            Disclaimer: This is a sample application aimed at showcasing the{" "}
            <a href="https://firebase.developers.google.com/docs">Firebase</a>{" "}
            platform capabilities. Avoid posting personal or private data.
          </div> */}
        </div>
      </div>
    );
  }
}

export default Login;
