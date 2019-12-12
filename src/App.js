import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import './App.css';
import Login from './components/login'
import userGlobal from './state/userState'
import Dashboard from './components/dashboard';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function App() {

  const [userState, userActions] = userGlobal();

  if(userState.jwt != '') {
    return (
      <Fragment>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
    </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Route path="/" exact component={Login} />
        <Redirect to="/"  />
      </Fragment>
    )
  }
}

export default App;
