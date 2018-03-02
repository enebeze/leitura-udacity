import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";

import { Provider } from "react-redux";
import createStore from "./store";

const store = createStore();

export default () => (
  <Provider store={store} >
    <BrowserRouter>
      <div>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/:category?/:postId?" component={Home} />
      </div>
    </BrowserRouter>
  </Provider>
);
