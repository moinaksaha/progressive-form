/*
	=========================================================
	COMPONENT NAME: Step3
	FUNCTION: Returns the THIRD STEP of the component of the form
	PROPS:  checkInputCall -> value of the 'checkInputCall' property from the store of the input validation function.
			checkInputSuccess -> value of the 'checkInputSuccess' property from the store of the input validation function. 
			showRequired -> whether to show the field is required error message
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { FormControl, FormGroup, ControlLabel, Button, Image, Glyphicon } from 'react-bootstrap';

// Import styles from the 'Home.css' file in the Home container
import styles from '../../containers/Home/Home.css';

// Import StepHeading component from this directory
import StepHeading from './StepHeading';

// Requiring the loadingInProgress image for user prompt
const loadingInProgress = require('../../images/loadingInProgress.gif')

export default class Step3 extends Component{

	constructor(){
		super();

		this.state = {
			value: "",
			isEmpty: false,
			validationIconState: null, // Possible values: 'invalid', 'valid'
			validationMessage: null
		}
	}

	componentDidMount = () => {
		// Scroll the component into view when loaded in the DOM for the first time
		this.refs.step3.scrollIntoView({behavior: 'smooth'});

	}

	componentWillReceiveProps = (nextProps) => {
		// Set the textInput value on recieving the success response from the input validation function.
		if(nextProps.checkInputSuccess && !this.props.checkInputSuccess){
		  	this.setTextData();
			this.setIconState('ok');
		}
		// Handle the error response from the input validation function.
		if(nextProps.checkInputFail && !this.props.checkInputFail){
			this.setIconState("error")
		}
	}

	/*
		FUNCTION to set validated text input data to the state
	*/
	setTextData = () => {
		const { setTextValue } = this.props;
		setTextValue(this.state.value);
	}
	
	/*
		FUNCTION to check whether to call the validation API or not with the input text
	*/
	validateInputData = () => {
		if(this.state.value !== ""){
			const { validateInput } = this.props;
			validateInput(this.state.value);
		}else{
			this.showEmptyMessage();
		}
	}

	/*
		FUNCTION to handle the change event on the FormControl element. 
	*/
	handleChange = (event) => {
		this.setState({
			value: event.target.value.trim()
		})
		// unset the text value in state on change of input value
		const { unSetTextValue } = this.props;
		unSetTextValue();
		// reset the validation state in the store
		this.resetInputValidation();
		// set icon state on change
		if(event.target.value.trim() !== ""){
			this.setIconState('alert')
		}else{
			this.setIconState()
		}
		
	}

	/*
		FUNCTION to handle the 'ENTER' key on the FormControl element
	*/
	handleEnterKey = (event) => {
		if(event.key === 'Enter'){
			// prevent the default behaviour
			event.preventDefault();
			// Validate input or show error message based on the current value
			if(event.target.value.trim() !== ""){
				this.validateInputData();
			}else{
				this.showEmptyMessage();
			}
		}
	}

	/*
		FUNCTION to show field empty error message on trying to validate with no input
	*/
	showEmptyMessage = () => {
		// show error message by setting state to true
		this.setState({
			isEmpty: true
		})
		// setTimeout call to hide the error message after 2 seconds
		setTimeout(() => {
			this.setState({
				isEmpty: false
			})
		}, 2000)
	}

	/*
		FUNCTION to reset the store state of the input validation function.
	*/
	resetInputValidation = () => {
		const { clearInputValidationData } = this.props;
		clearInputValidationData();
	}

	/*
		FUNCTION to set the validation icon state to render appropriate error message
		Possible values [validationIconState]: 'alert', 'remove-sign', 'ok'
		Possible values [validationMessage]: 'Please press check to validate', 'Invalid Input', 'Input is valid'
	*/
	setIconState = (iconState) => {
		if(!iconState){
			this.setState({
				validationIconState: null,
				validationMessage: null
			})
		}else{
			if(iconState === 'ok'){
				this.setState({
					validationIconState: 'ok',
					validationMessage: 'Input is valid'
				})
			}else if(iconState === 'error'){
				this.setState({
					validationIconState: 'remove-sign',
					validationMessage: 'Invalid Input'
				})
			}else{
				this.setState({
					validationIconState: 'alert',
					validationMessage: 'Please press check to validate'
				})
			}
		}
	}

	render = () => {

		const { checkInputCall, showRequired } = this.props;

		// let isInputValidated = ((this.state.value !== "") && (checkInputSuccess)) ? true: false;

		//INLINE styling to show or hide the icon
		const isEmptyStyle = {
			display: (this.state.isEmpty) ? `block` : `none`
		}

		// Variable to handle whether to show the 'validation' error message or 'input is empty' error message
		let showValidationMessage = null;

		// logic for the 'showValidationMessage' handle
		if(showRequired){
			console.log(this.state.value)
			if(this.state.value !== ""){
				showValidationMessage = "showValidation";
			}
		}

		return (

			<div className={`${styles.formStep} ${styles.step3}`}
				 ref="step3">

			  	<StepHeading headingtext={`Step 3: `} 
							 showRequired={showRequired}
							 showValidationMessage={showValidationMessage}/>

				<div className={`${styles.content} clearfix`}>

					<FormGroup controlId="formTextInput">

						<ControlLabel className={`${styles.helpText}`}>

							Please enter a value

							{(this.state.validationIconState)? 

								<span className={`${styles.inputValidation} ${styles[this.state.validationIconState]}`}>

									<Glyphicon glyph={this.state.validationIconState}
										   	   className={`${styles.inputValidationIcon}`}/>
									
									<span>{this.state.validationMessage}</span>
										   
								</span> :

								null
							
							}
							
						</ControlLabel>

						<FormControl type="text"
									 placeholder="@abcdef"
									 onChange={this.handleChange}
									 className={`${styles.textInput}`}
									 onKeyPress={this.handleEnterKey}
									 disabled={checkInputCall} />

					</FormGroup>

					<div className={`${styles.emptyMessage}`} style={isEmptyStyle}>Input can't be empty</div>

					<Button type="button" 
							className={`${styles.checkButton} pull-right`}
							onClick={this.validateInputData}
							disabled={checkInputCall}>

						{(checkInputCall) ? 

							<span>

								<Image src={loadingInProgress} className={`${styles.loader}`}/>

								<span>Check</span>

							</span> : 

							<span>Check</span>
						
						}
							
					</Button>

				</div>

			</div>
			
		);

	}

};

Step3.defaultProps = {

};
