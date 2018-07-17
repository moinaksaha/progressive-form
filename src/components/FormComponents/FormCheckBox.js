/*
	=========================================================
	COMPONENT NAME: FormCheckBox
	FUNCTION: Returns the checkbox element used in Step2 of the Form
	PROPS:  checkBoxID -> 'id' of the checkbox element
			setCheckedValue -> method to set the current checked value of the checkbox on the parent 
			labelText -> label to display with the checkbox
			checkBoxName ->	name for the checkbox
	=========================================================
*/

import React, { Component } from 'react';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

export default class FormCheckBox extends Component{

	// constructor(){
    // 	super();
	// }

	/*
		FUNCTION to handle change event on the checkbox
	*/
	handleChange = (event) => {

		const { setCheckedValue, labelText } = this.props;

		setCheckedValue(labelText, event.target.checked);

	}

	render = () => {

        const { checkBoxID, checkBoxName, labelText } = this.props;
		
		return (

			<div>

				<label  htmlFor={checkBoxID} 
						className={`${styles.checkboxCustomLabel} ${styles.containerCheckmark}`}>
                
                    {labelText}

					<input type="checkbox"  
						   id={checkBoxID} 
						   name={checkBoxName} 
						   className={`${styles.checkboxCustom}`}
						   onChange={this.handleChange} />

                    <span className={`${styles.checkmark}`}></span>

                </label>

            </div>

		);

	}
	
};

FormCheckBox.defaultProps = {

};
