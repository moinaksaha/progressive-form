import React, { Component } from 'react';

import { FormGroup, Radio, ControlLabel } from 'react-bootstrap'

import styles from '../../containers/Home/Home.css';

export default class FormToggleButton extends Component{

	constructor(){
    	super();
	}
	  
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
