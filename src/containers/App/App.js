/*
	=========================================================
	CONTAINER NAME: App
	FUNCTION: Returns the App container
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { Grid } from 'react-bootstrap';

// Import style from the App.css file
// import styles from './App.css';
import './App.css';

export default class App extends Component {
  // constructor(props) {
  //   /**
  //    * This is for illustration purpose. Since this is empty. It can be removed
  //   */
  //   super(props);
  // }

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
