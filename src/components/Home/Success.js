import React, { Component } from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import styles from '../../containers/Home/Home.css'

export default class Success extends Component{

	constructor(){
    	super();
    }
      
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
