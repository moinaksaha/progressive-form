/*
	=========================================================
	COMPONENT NAME: Step1
  FUNCTION: Returns the FIRST STEP of the component of the form
  PROPS:  setCheckedValue -> method to set the value of the selected component
          showRequired -> whether to show the field is required error message
	=========================================================
*/

import React, { Component } from 'react';

import { ControlLabel } from 'react-bootstrap';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

// Import StepHeading component from this directory
import StepHeading from './StepHeading';

// Import the FormCheckBox component
import FormCheckBox from '../FormComponents/FormCheckBox';

export default class Step1 extends Component{

	constructor(){
    	super();
  	}

	render = () => {

    const { setCheckedValue, showRequired } = this.props;

		return (

			<div className={`${styles.formStep} ${styles.step1}`}>

        <StepHeading headingtext={`Step 1:`} 
                     showRequired={showRequired}/>

          <div className={`${styles.content}`}>

            <ControlLabel className={`${styles.helpText}`}>Please select an OPTION</ControlLabel>

            <FormCheckBox checkBoxID={`checkBox1`}
                          checkBoxName={`checkBox1`}
                          labelText={`A1`}
                          setCheckedValue={setCheckedValue} />

            <FormCheckBox checkBoxID={`checkBox2`}
                          checkBoxName={`checkBox2`}
                          labelText={`A2`}
                          setCheckedValue={setCheckedValue} />

          </div>

      </div>

    );
    
  }
  
};

Step1.defaultProps = {

};
