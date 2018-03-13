import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";

class App extends Component {
  render() {
    const { match: { params } } = this.props;

    return params.category === "Login" ? (
      <Login />
    ) : (
      <Home category={params.category} postId={params.postId} history={this.props.history} />
    );
  }
}

export default App;
