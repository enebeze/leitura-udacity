import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./views/App";

import { Provider } from "react-redux";
import createStore from "./store";

const store = createStore();

export default () => (
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <Route exact path="/:category?/:postId?" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
);
