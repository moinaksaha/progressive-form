import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-bootstrap';

import styles from './App.css';


// @connect((state) => {
//   return {
//   };
//  },{
// })

export default class App extends Component {
  constructor(props) {
    /**
     * This is for illustration purpose. Since this is empty. It can be removed
    */
    super(props);
  }

  componentWillMount = () => {

  }

  render() {
    
    const { children } = this.props;

    return (

      <Grid fluid >

        {children}

      </Grid>
      
    )

  }

}

App.propTypes = {
};
