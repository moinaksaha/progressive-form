import React, { Component } from 'react';

import styles from '../../containers/Home/Home.css';

import FormHeading from '../Form/FormHeading';
import Step1 from '../Form/Step1';
import Step2 from '../Form/Step2';
import Step3 from '../Form/Step3';
import Step4 from '../Form/Step4';
import SubmitButton from '../Form/SubmitButton';

export default class ProgressiveForm extends Component{

	constructor(){
		super();
		
		this.state = {
			showStep1: false,
			showStep2: false,
			showStep3: false,
			showStep4: false,
			showSubmitButton: false
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.showCurrentState && this.props.showCurrentState !== nextProps.showCurrentState ){
			this.handleStepDisplay(nextProps.showCurrentState);
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		
	}

	componentDidMount = () => {
		this.handleStepDisplay();
	}

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
