import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";

import { auth } from "../firebase/firebase";

/* Actions */
import AuthActions from "../store/ducks/auth";
/* connect redux */
import { connect } from "react-redux";

class App extends Component {
  
  componentDidMount() {

    const { history } = this.props;
    
    /* observer auth login */
    auth.onAuthStateChanged(authLogin => {
      if (authLogin) {
        /* create user */
        const user = {
          displayName: authLogin.displayName,
          email: authLogin.email,
          photoURL: authLogin.photoURL,
        } 
        
        if (!this.props.user) {
          /* Save user on store */
          this.props.login(user);
        }
        
        /* redirect to home */
        history.push("/")
      } else {
        /* if user is not null */
        if (this.props.user) {
          this.props.logout();
          /* redirect to Login */
          history.push("/Login")
        }
          
      }
    });
  }

  render() {
    const { match: { params } } = this.props;

    return params.category === "Login" ? (
      <Login history={this.props.history} />
    ) : (
      <Home category={params.category} postId={params.postId} history={this.props.history} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(AuthActions.authLogin(user)),
  logout: () => dispatch(AuthActions.authLogout())
});

export default connect(mapStateToProps  , mapDispatchToProps)(App);
