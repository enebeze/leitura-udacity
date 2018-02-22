import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./views/Home";
import Details from "./views/Details";
import FormPost from "./components/FormPost";

export default () => (
  <BrowserRouter>
    <div>
      <Route path="/:category?/:post_id?" component={Home} />
    </div>
  </BrowserRouter>
);
