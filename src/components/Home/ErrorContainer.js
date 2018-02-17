/*
	=========================================================
	COMPONENT NAME: ErrorContainer
	FUNCTION: Returns the ErrorContainer of the Form
	PROPS:  errorMessage -> actual text to display as error
			hideErrorMessage -> function to hide error message 
	=========================================================
*/

import React, { Component } from 'react';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

export default class ErrorContainer extends Component{

	constructor(){
    	super();
	}
	
	/*
		FUNCTION to dismiss the message box on click of close icon
	*/
	closeErrorDiv = () => {
		const { hideErrorMessage } = this.props;
		hideErrorMessage()
	}

	render = () => {

		const { errorMessage } = this.props;

		return (

			<div className={`${styles.errorContainer} text-center`}>

                <div className={`${styles.closeButton}`}
					 onClick={this.closeErrorDiv}>x</div>

                <div className={`${styles.heading}`}>Error !</div>

                <div className={`${styles.content}`}>{errorMessage}</div>

            </div>

		);

	}
	
};

ErrorContainer.defaultProps = {

};
