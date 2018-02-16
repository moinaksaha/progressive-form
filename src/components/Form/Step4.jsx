import React, { Component } from 'react';

import { FormGroup, ControlLabel, option, FormControl } from 'react-bootstrap';

import styles from '../../containers/Home/Home.css';

import StepHeading from './StepHeading';

export default class Step4 extends Component{

	constructor(props){
    	super(props);
  }

  componentDidMount = () => {
    this.refs.step4.scrollIntoView({behavior: 'smooth'});
  }


  handleChange = (event) => {
    const { setSelectValue } = this.props;
    setSelectValue(event.target.value);
  }

	render = () => {

		return (

			<div className={`${styles.formStep} ${styles.step4}`}
           ref="step4">

        <StepHeading headingtext={`Step 4: `} />

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
