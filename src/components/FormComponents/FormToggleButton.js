/*
	=========================================================
	COMPONENT NAME: FormToggleButton
	FUNCTION: Returns the radio button element used in Step2 of the Form
	PROPS:  toggleID -> 'id' of the radio button element
			setToggleValue -> method to set the current checked value of the radio button on the parent 
			labelText -> label to display with the radio button element
			toggleName ->	name for the radio button element
			togglevalue -> value of the radio button element
	=========================================================
*/

import React, { Component } from 'react';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

export default class FormToggleButton extends Component{

	constructor(){
    	super();
	}
	
	/*
		FUNCTION to handle change event on the radio button
	*/
	handleChange = (event) => {
		const { togglevalue, setToggleValue } = this.props;
		setToggleValue(togglevalue);
	}

	render = () => {

        const { toggleID, toggleName, togglevalue, labelText } = this.props;
		
		return (

			<div>

				<label className={`${styles.switch}`} 
					   htmlFor={toggleID}> 
                  
            		<div className={`${styles.customLabelText}`}>{labelText}</div> 

					<input type="radio" 
						   id={toggleID} 
						   name={toggleName} 
						   value={togglevalue} 
						   onChange={this.handleChange}
						   ref="radioButton"/>

                	<div className={`${styles.slider} ${styles.round}`}></div>

                </label>

            </div>

		);

	}
	
};

FormToggleButton.defaultProps = {

};
