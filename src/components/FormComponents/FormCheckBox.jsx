import React, { Component } from 'react';

import styles from '../../containers/Home/Home.css';

export default class FormCheckBox extends Component{

	constructor(){
    	super();
	}
	  
	handleChange = (event) => {
		const { setCheckedValue, labelText } = this.props;

		// console.log(event, event.target.checked)

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
