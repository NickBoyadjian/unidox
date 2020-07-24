import React, { Component, Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.scss';
import Login from './components/login'
import userGlobal from './state/userState'
import Dashboard from './components/dashboard';
import Signup from './components/signup';
import Home from './components/home';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function App() {

  const [userState, userActions] = userGlobal();

  useEffect(() => {
    userActions.getProfile();
  }, []);

  if (userState.jwt || userState.username) {
    return (
      <Fragment>
        <Route path="/dashboard" exact component={Dashboard} />
        <Redirect to="/dashboard" />
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/home" exact component={Home} />
        <Redirect to="/" />
      </Fragment>
    )
  }
}

export default App;
