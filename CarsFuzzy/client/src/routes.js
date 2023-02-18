import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Login from "./containers/Admin/login";
import AddCar from "./containers/Admin/add";
import Register from "./containers/register";

import Layout from "./hoc/layout";
import Auth from "./hoc/auth";
import Logout from "./containers/logout";
const Routing = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/car/add" exact component={Auth(AddCar, true)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/logout" exact component={Auth(Logout, true)} />
      </Switch>
    </Layout>
  );
};

export default Routing;
