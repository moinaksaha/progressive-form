import React, { Component } from 'react';

import styles from '../../containers/Home/Home.css';

export default class StepHeading extends Component{

	constructor(){
    	super();
  	}

	render = () => {
		
		const { headingtext } = this.props;
		
		return (

			<div className={`${styles.heading}`}>{headingtext}</div>

		);
	}
};

StepHeading.defaultProps = {

};
