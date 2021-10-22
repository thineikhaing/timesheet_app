import React from "react";
import {Route, Switch } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProfile from "./admin/AdminProfile";
import Users from "./admin/Users";
import Attendence from "./admin/Attendence";
import UserAttendence from "./admin/UserAttendence";

export default function AdminRoutes() {
	return (
	  <Switch>
		<Route path="/" exact component={AdminDashboard} />
        <Route path="/staff" component={Users} />
        <Route path="/attendence" component={Attendence} />
        <Route path="/user_attendence/:id" component={UserAttendence} />
		<Route path="/profile" component={AdminProfile} />
	  </Switch>
	);
  }
  