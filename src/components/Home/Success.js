/*
	=========================================================
	COMPONENT NAME: Success
	FUNCTION: Returns the successfully submitted component of the page
	PROPS:  resetFormData -> method to reset the form data in the store
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { Button, Glyphicon } from 'react-bootstrap';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css'

export default class Success extends Component{

	constructor(){
    	super();
    }
    
    /*
		Function to reset the submit form state in the store
	*/
    resetForm = () => {
        console.log("happy resetting form");
        const { resetFormData } = this.props;
        resetFormData();
    }

	render = () => {

		return (

                <div className={`${styles.successContainer} text-center center-block`}>

                    <div className={`${styles.heading}`}>

                        <Glyphicon glyph={`ok`}
								   className={`${styles.inputValidationIcon}`}/>

                        <div>Form Submitted Successfully</div>

                    </div>

                    <div className={`${styles.content} text-center`}>
                    
                        <Button type="button" 
                                className={`${styles.successButton}`}
                                onClick={this.resetForm}>

                            Re Submit Form

                        </Button>

                        <div>*Alternatively, you can refresh the page.</div>

                        <div>*We're not saving any data here ;)</div>
                    
                    </div>

                </div>

        );
        
    }
    
};

Success.defaultProps = {

};
