import React, { Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.scss';
import Login from './components/login'
import userGlobal from './state/userState'
import Dashboard from './components/dashboard';
import Signup from './components/signup';
import Home from './components/home';

function App() {

  const [userState, userActions] = userGlobal();

  useEffect(() => {
    userActions.getProfile();
  }, [userActions]);

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
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/home" exact component={Home} />
        <Redirect to="/" />
      </Fragment>
    )
  }
}

export default App;
