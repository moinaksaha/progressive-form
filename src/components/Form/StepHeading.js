/*
	=========================================================
	COMPONENT NAME: StepHeading
	FUNCTION: Returns the StepHeading component for each step of the form
	PROPS:  headingtext -> text to be rendered as the heading
			showValidationMessage -> handle to show 'validation' error message or 'Required field' error message 
			showRequired -> whether to show the field is required error message
	=========================================================
*/

import React, { Component } from 'react';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

export default class StepHeading extends Component{

	constructor(){
    	super();
  	}

	render = () => {
		
		const { headingtext, showRequired, showValidationMessage } = this.props;
		
		return (

			<div className={`${styles.heading}`}>

				<span>{headingtext}</span>	

				{(showRequired) ? 

					<span className={`${styles.requiredMessage}`}>

						{(showValidationMessage && showValidationMessage === "showValidation") ? 

							<span className={`${styles.valid}`}>Please validate this field before submitting form</span> : 

							<span>* Required Field! Cannot be empty</span>
					
						}
						
					</span> : 

					null
				}

			</div>

		);
	}
};

StepHeading.defaultProps = {

};
