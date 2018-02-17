/*
	=========================================================
	COMPONENT NAME: Step2
  FUNCTION: Returns the SECOND STEP of the component of the form
  PROPS:  setToggleValue -> method to set the value of the current selection
          showRequired -> whether to show the field is required error message
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { FormGroup, ControlLabel } from 'react-bootstrap';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

// Import StepHeading component from this directory
import StepHeading from './StepHeading';

// Import FormToggleButton component from FormComponents directory
import FormToggleButton from '../FormComponents/FormToggleButton';

export default class Step2 extends Component{

	constructor(props){
    	super(props);
  }

  componentDidMount = () => {
    // Scroll component into view on first render
    this.refs.step2.scrollIntoView({behavior: 'smooth'});
  }

	render = () => {

    const { setToggleValue, showRequired } = this.props;

		return (

			<div className={`${styles.formStep} ${styles.step2}`}
           ref="step2">

        <StepHeading headingtext={`Step 2:`}
							       showRequired={showRequired} />

        <div className={`${styles.content}`}>

          <FormGroup controlId="formRadioInput" >

            <ControlLabel className={`${styles.helpText}`}>Please toggle a switch</ControlLabel>

            <div>

              <FormToggleButton toggleID={`radio1`}
                                toggleName={`progressiveFormToggle`}
                                togglevalue={`B1`}
                                labelText={`B1`}
                                setToggleValue={setToggleValue} />

            </div>

            <div>

              <FormToggleButton toggleID={`radio2`}
                                toggleName={`progressiveFormToggle`}
                                togglevalue={`B2`}
                                labelText={`B2`}
                                setToggleValue={setToggleValue} />

            </div>

          </FormGroup>

        </div>

      </div>
      
    );
    
  }
  
};

Step2.defaultProps = {

};
