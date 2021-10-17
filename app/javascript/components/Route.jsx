import React from "react";
import {Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import EditProfile from "./EditProfile";

export default function Routes() {
	return (
	  <Switch>
		<Route path="/" exact component={Home} />
		<Route path="/edit_profile" component={EditProfile} />
	  </Switch>
	);
  }
  