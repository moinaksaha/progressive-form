import React, { Component } from 'react';

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
