import React from 'react';
import { Route, Router } from 'react-router';
import App from './containers/App/App'
import Home from './containers/Home/Home'
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store, history) => {

  return (

    <Router history={history}>

        <App>

            <Route path="/" component={Home}/>

        </App>

    </Router>

  );

};
