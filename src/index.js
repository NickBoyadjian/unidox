import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';  

import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';

ReactDOM.render(<BrowserRouter>
    <Switch >
        <Route path="/" exact component={App} />
        <Route path="/:someParam"  component={App}/>
    </Switch >
  </BrowserRouter>, document.getElementById('root'));

