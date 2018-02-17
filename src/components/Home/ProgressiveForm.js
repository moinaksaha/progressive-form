/*
	=========================================================
	COMPONENT NAME: ProgressiveForm
	FUNCTION: Returns the actual Form component of the page
	PROPS:  checkBoxID -> 'id' of the checkbox element
			setCheckedValue -> method to set the current checked value of the checkbox on the parent 
			labelText -> label to display with the checkbox
			checkBoxName ->	name for the checkbox
	=========================================================
*/

import React, { Component } from 'react';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

// Import heading, steps, and submit button components to be used in this form
import FormHeading from '../Form/FormHeading';
import Step1 from '../Form/Step1';
import Step2 from '../Form/Step2';
import Step3 from '../Form/Step3';
import Step4 from '../Form/Step4';
import SubmitButton from '../Form/SubmitButton';

export default class ProgressiveForm extends Component{

	constructor(){
		super();
		
		/*
			initial state of the component
		*/
		this.state = {
			showStep1: false, //handle to show the step1 or not
			showStep2: false, //handle to show the step2 or not
			showStep3: false, //handle to show the step3 or not
			showStep4: false, //handle to show the step4 or not
			showSubmitButton: false // handle to show the submit button or not
		}
	}

	/*
		'componentWillReceiveProps' LifeCycle method of React
		USE: handles which steps to display on recieving the prop 'showCurrentState'
	*/
	componentWillReceiveProps = (nextProps) => {
		if(nextProps.showCurrentState && this.props.showCurrentState !== nextProps.showCurrentState ){
			this.handleStepDisplay(nextProps.showCurrentState);
		}
	}

	/*
		'componentDidMount' LifeCycle method of React
		USE: handles the default rendering state for the app on first render
	*/
	componentDidMount = () => {
		this.handleStepDisplay();
	}

	/*
		FUNCTION to handle which step to display on completion of a step 
	*/
	handleStepDisplay = (section) => {
		switch(section){
			case 'step1':
				this.setState({
					showStep1: true
				});
				break;

			case 'step2':
				this.setState({
					showStep2: true
				});
				break;

			case 'step3':
				this.setState({
					showStep3: true
				});
				break;

			case 'step4':
				this.setState({
					showStep4: true
				});
				break;

			case 'submitButton':
				this.setState({
					showSubmitButton: true
				});
				break;
			
			default:
				this.setState({
					showStep1: true
				});
				break;
		}
	}


	render = () => {

		/*
			The props of this component
		*/
		const { setCheckedValue, 
				setSelectValue, 
				validateInput, 
				setToggleValue, 
				setTextValue, 
				unSetTextValue,
				checkInputFail,
				checkInputSuccess, 
				checkInputCall,
				clearInputValidationData,
				submitFormData,
				requiredErrorStep1,
				requiredErrorStep2,
				requiredErrorStep3,
				requiredErrorStep4,
				submitFormFail } = this.props;

		return (

			<div className={`${styles.mainForm} center-block`}>
        
				<FormHeading />
				
				<form>

					{(this.state.showStep1)?
					
						<Step1 setCheckedValue={setCheckedValue}
							   showRequired={requiredErrorStep1} /> : 

						null

					}

					{(this.state.showStep2)?
					
						<Step2 setToggleValue={setToggleValue}
								showRequired={requiredErrorStep2} /> : 

						null

					}

					{(this.state.showStep3)?
					
						<Step3 validateInput={validateInput}
							   setTextValue={setTextValue}
							   unSetTextValue={unSetTextValue}
							   checkInputSuccess={checkInputSuccess}
							   checkInputCall={checkInputCall}
							   clearInputValidationData={clearInputValidationData}
							   checkInputFail={checkInputFail}
							   showRequired={requiredErrorStep3} /> : 

						null

					}

					{(this.state.showStep4)?
					
						<Step4 setSelectValue={setSelectValue}
								showRequired={requiredErrorStep4} /> : 

						null

					}

					{(this.state.showSubmitButton)?
					
						<SubmitButton submitFormData={submitFormData}
									  submitFormFail={submitFormFail}/> : 

						null

					}

				</form>

			</div>

		);

	}
	
};

ProgressiveForm.defaultProps = {

};
