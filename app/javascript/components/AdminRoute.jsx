import React from "react";
import {Route, Switch } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminProfile from "./AdminProfile";
import Users from "./Users";
import Attendence from "./Attendence";

export default function AdminRoutes() {
	return (
	  <Switch>
		<Route path="/" exact component={AdminDashboard} />
        <Route path="/staff" component={Users} />
        <Route path="/attendence" component={Attendence} />
		<Route path="/profile" component={AdminProfile} />
	  </Switch>
	);
  }
  