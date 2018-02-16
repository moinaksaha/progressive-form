import React, { Component } from 'react';

import { FormControl, FormGroup, ControlLabel, Button, Image, Glyphicon } from 'react-bootstrap';

import styles from '../../containers/Home/Home.css';

import StepHeading from './StepHeading';

const loadingInProgress = require('../../images/loadingInProgress.gif')

export default class Step3 extends Component{

	constructor(){
		super();

		this.state = {
			value: "",
			isEmpty: false,
			validationIconState: null, // 'invalid', 'valid'
			validationMessage: null
		}
	}

	componentDidMount = () => {
		this.refs.step3.scrollIntoView({behavior: 'smooth'});
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.checkInputSuccess && !this.props.checkInputSuccess){
		  	this.setTextData();
			this.setIconState('ok');
		}
		if(nextProps.checkInputFail && !this.props.checkInputFail){
			this.setIconState("error")
		}
	}

	setTextData = () => {
		const { setTextValue } = this.props;
		setTextValue(this.state.value);
		
	}
	

	validateInputData = () => {
		if(this.state.value !== ""){
			const { validateInput } = this.props;
			validateInput(this.state.value);
		}else{
			this.showEmptyMessage();
		}
	}
	  
	handleChange = (event) => {
		this.setState({
			value: event.target.value.trim()
		})
		const { unSetTextValue } = this.props;
		unSetTextValue();
		this.resetInputValidation();
		if(event.target.value.trim() !== ""){
			this.setIconState('alert')
		}else{
			this.setIconState()
		}
		
	}

	handleEnterKey = (event) => {
		if(event.key === 'Enter'){

			event.preventDefault();

			if(event.target.value.trim() !== ""){
				this.validateInputData();
			}else{
				this.showEmptyMessage();
			}
		}
	}

	showEmptyMessage = () => {
		this.setState({
			isEmpty: true
		})
		setTimeout(() => {
			this.setState({
				isEmpty: false
			})
		}, 2000)
	}

	resetInputValidation = () => {
		const { clearInputValidationData } = this.props;
		clearInputValidationData();
	}

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

		const { checkInputCall, checkInputSuccess, showRequired } = this.props;
		// console.log(styles[this.state.validationIconState])

		// console.log(this.state.validationIconState)
		// console.log(this.state.value)

		let isInputValidated = ((this.state.value !== "") && (checkInputSuccess)) ? true: false;

		const isEmptyStyle = {
			display: (this.state.isEmpty) ? `block` : `none`
		}

		// console.log(isEmptyStyle)

		return (

			<div className={`${styles.formStep} ${styles.step3}`}
				 ref="step3">

			  	<StepHeading headingtext={`Step 3: `} 
							 showRequired={showRequired}/>

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
							onClick={this.validateInputData}>

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
