import React, { Component } from 'react';
					
/* <label htmlFor="textinput" className={`${styles.helpText}`}>Enter the Value</label>

<input type="text" name="name" className={`${styles.textInput}`} id="textinput" required /> */

import { Grid, Row, Col, form, FormGroup, Checkbox, Radio, ControlLabel, Button, option, FormControl, HelpBlock, Image } from 'react-bootstrap';

import { checkIt } from '../../utils/api';

import styles from '../../containers/Home/Home.css';

import StepHeading from './StepHeading';

const loadingInProgress = require('../../images/loadingInProgress.gif')

export default class Step3 extends Component{

	constructor(){
		super();

		this.state = {
			value: ""
		}
	}

	componentDidMount = () => {
		this.refs.step3.scrollIntoView({behavior: 'smooth'});
	}

	componentWillReceiveProps = (nextProps) => {
		// console.log(nextProps)
		if(nextProps.testCallSuccess && !this.props.testCallSuccess){
		  this.setTextData()
		}
	}

	setTextData = () => {
		const { setTextValue } = this.props;
		setTextValue(this.state.value);
	}
	

	validateInputData = () => {
		if(this.state.value != ""){
			const { validateInput } = this.props;
			validateInput(this.state.value);
		}
	}
	  
	handleChange = (event) => {
		this.setState({
			value: event.target.value
		})
		const { unSetTextValue } = this.props;
		unSetTextValue();
	}

	handleEnterKey = (event) => {
		if(event.key === 'Enter'){
			event.preventDefault();
			this.validateInputData();
		}
	}

	render = () => {

		const { testCallSuccess, testCall } = this.props;

		return (

			<div className={`${styles.formStep} ${styles.step3}`}
				 ref="step3">

			  	<StepHeading headingtext={`Step 3: `} />

				<div className={`${styles.content} clearfix`}>

					<FormGroup controlId="formTextInput" >

						<ControlLabel className={`${styles.helpText}`}>Please enter a value</ControlLabel>

						<FormControl type="text"
									 placeholder="@abcdef"
									 onChange={this.handleChange}
									 className={`${styles.textInput}`}
									 onKeyPress={this.handleEnterKey}
									 disabled={testCall} />

					</FormGroup>

					<Button type="button" 
							className={`${styles.checkButton} pull-right`}
							onClick={this.validateInputData}>

						{(testCall) ? 

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
