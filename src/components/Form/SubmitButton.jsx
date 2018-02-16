import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import styles from '../../containers/Home/Home.css';

export default class SubmitButton extends Component{

	constructor(){
    	super();
	}

	componentDidMount = () => {
		this.refs.submitButton.scrollIntoView({behavior: 'smooth'});
	}
	
	  
	handleClick = (event) => {
		const { submitFormData } = this.props;
		submitFormData();
		// event.preventDefault();
	}

	render = () => {

		return (

			<div className={`${styles.formStep} ${styles.submit} text-center`}
				 ref="submitButton">

				  <Button type="button" 
				  		  className={`${styles.submitButton}`}
						  onClick={this.handleClick}>Submit</Button>

            </div>

		);

	}
	
};

SubmitButton.defaultProps = {

};
