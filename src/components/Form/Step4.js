/*
	=========================================================
	COMPONENT NAME: Step4
	FUNCTION: Returns the FOURTH STEP of the component of the form
	PROPS:  setSelectValue -> Method to set the value of the current selection on the state of the Home container. 
			    showRequired -> whether to show the field is required error message
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { FormGroup, ControlLabel, option, FormControl } from 'react-bootstrap';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

// Import StepHeading component from this directory
import StepHeading from './StepHeading';

export default class Step4 extends Component{

	// constructor(props){
  //   	super(props);
  // }

  componentDidMount = () => {
    // Scroll the component into view when loaded in the DOM for the first time
    this.refs.step4.scrollIntoView({behavior: 'smooth'});
  }

  /*
		FUNCTION to handle change event on the select dropdown
	*/
  handleChange = (event) => {
    const { setSelectValue } = this.props;
    setSelectValue(event.target.value);
  }

	render = () => {

    const { showRequired } = this.props;
    
		return (

			<div className={`${styles.formStep} ${styles.step4}`}
           ref="step4">

        <StepHeading headingtext={`Step 4: `} 
							       showRequired={showRequired}/>

        <div className={`${styles.content}`}>

          <FormGroup controlId="formSelectInput">

            <ControlLabel className={`${styles.helpText}`}>Please select an option</ControlLabel>

            <FormControl bsClass={`${styles.selectInput} form-control`} 
                         componentClass="select" 
                         placeholder="select" 
                         onChange={this.handleChange}>

              <option value=""></option>

              <option value="C1">C1</option>

              <option value="C2">C2</option>

              <option value="C3">C3</option>

            </FormControl>

          </FormGroup>

        </div>

      </div>

    );
    
  }
  
};

Step4.defaultProps = {

};
