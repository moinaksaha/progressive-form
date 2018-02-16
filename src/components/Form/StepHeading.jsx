import React, { Component } from 'react';

import styles from '../../containers/Home/Home.css';

export default class StepHeading extends Component{

	constructor(){
    	super();
  	}

	render = () => {
		
		const { headingtext, showRequired } = this.props;
		
		return (

			<div className={`${styles.heading}`}>
				<span>{headingtext}</span>	
				{(showRequired) ? 
					<span className={`${styles.requiredMessage}`}>
						* Required Field! Cannot be empty
					</span> : 

					null
				}
			</div>

		);
	}
};

StepHeading.defaultProps = {

};
