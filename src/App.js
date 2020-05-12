import React from "react";

import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./SecurityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./SecurityUtils/SecuredRoute";

const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken) {
  setJWTToken(jwtToken);

  const decodedToken = jwt_decode(jwtToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" exact component={Landing} />
            <Route exact path="/register" exact component={Register} />
            <Route exact path="/login" exact component={Login} />
            <SecuredRoute exact path="/addProject" component={AddProject} />
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute
              exact
              path="/update/:name"
              component={UpdateProject}
            />
            <SecuredRoute
              exact
              path="/projectBoard/:id"
              component={ProjectBoard}
            />
            <SecuredRoute
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <SecuredRoute
              exact
              path="/updateProjectTask/:id/:ptId"
              component={UpdateProjectTask}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
