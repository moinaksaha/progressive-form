import React, { Component } from 'react';

import styles from '../../containers/Home/Home.css';

export default class ErrorContainer extends Component{

	constructor(){
    	super();
	}
	  
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
