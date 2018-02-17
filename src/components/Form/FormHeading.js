/*
	=========================================================
	COMPONENT NAME: FormHeading
	FUNCTION: Returns the heading component of the form
	=========================================================
*/

import React, { Component } from 'react';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

export default class FormHeading extends Component{

	constructor(){
    	super();
  	}

	render = () => {

		return (

			<div className={`${styles.formHeading} text-center`}>Progressive Form</div>

		);

	}
	
};

FormHeading.defaultProps = {

};
