import React, { Component } from 'react';

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
