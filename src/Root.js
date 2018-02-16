import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { Router } from 'react-router';
import createRoutes from './routes';
import PropTypes from 'prop-types';


// import fetchDataForRoute from './utils/fetchDataForRoute';

// Grab the state from a global injected into
// server-generated HTML

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        {/* <Router history={history} > */}
          {createRoutes(store, history)}
        {/* </Router> */}
      </Provider>
    );
  }
}
