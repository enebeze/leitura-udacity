import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./views/Home";
import Details from "./views/Details";

export default () => (
  <BrowserRouter>
    <div>
      <Route strict path="/:category?/:id?" component={Home} />
    </div>
  </BrowserRouter>
);
