import React from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import DataGrid from './containers/DataGrid';
import Form from './containers/Form';


function run() {
  const body = global.document.getElementById('application');

  const container = (
    <Router history={browserHistory}>
      <Route component={App}
             path="/"
      >
        <IndexRoute component={Home}/>
        <Route component={DataGrid}
               path="/data-grid"
        />
        <Route component={Form}
               path="/form"
        />
      </Route>
    </Router>
  );

  render(container, body);
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if (global.window.addEventListener) {
      global.window.addEventListener('DOMContentLoaded', resolve);
    } else {
      global.window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(global.document.body))
]).then(run);
