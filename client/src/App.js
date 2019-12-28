import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";


if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="App">
          <Navbar/>
          <Route path="/" component = {Landing} exact />
          <Route path="/register" component={Register} exact/>
          <Route path="/login" component={Login} exact/>
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
