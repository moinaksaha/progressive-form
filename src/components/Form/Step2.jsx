import React, { Component } from 'react';

import { Grid, Row, Col, form, FormGroup, Checkbox, Radio, ControlLabel, Button, option, FormControl } from 'react-bootstrap';

import styles from '../../containers/Home/Home.css';

import StepHeading from './StepHeading';

import FormToggleButton from '../FormComponents/FormToggleButton';

export default class Step2 extends Component{

	constructor(){
    	super();
  }

  componentDidMount = () => {
    this.refs.step2.scrollIntoView({behavior: 'smooth'});
  }

	render = () => {

    const { setToggleValue } = this.props;

		return (

			<div className={`${styles.formStep} ${styles.step2}`}
           ref="step2">

        <StepHeading headingtext={`Step 2:`} />

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
