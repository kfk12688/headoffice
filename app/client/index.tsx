import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import "./styles/lib.less";
import { AppContainer } from "./Containers/AppContainer";
import { TemplateContainer, Template, EditTemplate } from "./Routes/Template";
import { Content } from "./Routes/Content";
import { UsersContainer, Users, User } from "./Routes/Users";
import { Views } from "./Routes/View";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={AppContainer}>
      <Route path="/template" component={TemplateContainer}>
        <IndexRoute component={Template}/>
        <Route path="/template/edit/:templateName" component={EditTemplate}/>
      </Route>
      <Route path="/content" component={Content}/>
      <Route path="/view" component={Views}/>
      <Route path="/users" component={UsersContainer}>
        <IndexRoute component={Users}/>
        <Route path="/users/:username" component={User}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById("HOApp")
);
