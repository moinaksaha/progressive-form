/*
	=========================================================
	COMPONENT NAME: SubmitButton
	FUNCTION: Returns the SubmitButton component for the form
	PROPS:  submitFormData -> Method to initiate form validation 
			submitFormFail -> error state of the 'Submit Form' call from the store
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { Button } from 'react-bootstrap';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

export default class SubmitButton extends Component{

	constructor(){
    	super();
	}

	componentDidMount = () => {
		// Scroll the component into view when loaded in the DOM for the first time
		this.refs.submitButton.scrollIntoView({behavior: 'smooth'});
	}
	
	/*
		FUNCTION to handle click event on the Button component
	*/
	handleClick = (event) => {
		const { submitFormData } = this.props;
		submitFormData();
	}

	render = () => {

		const { submitFormFail } = this.props;

		// Handle to manage the disabled state of the button while the form submit call is in progress
		const isDisabled = (submitFormFail) ? true : false;

		return (

			<div className={`${styles.formStep} ${styles.submit} text-center`}
				 ref="submitButton">

				<Button type="button" 
				  		className={`${styles.submitButton}`}
						onClick={this.handleClick}
						disabled={isDisabled}>Submit</Button>

            </div>

		);

	}
	
};

SubmitButton.defaultProps = {

};
