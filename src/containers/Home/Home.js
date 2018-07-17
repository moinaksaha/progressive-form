/*
	=========================================================
	CONTAINER NAME: Home
	FUNCTION: Returns the Home page of the application which has the form, error message, submission successful message, LoaderModal component
	PROPS:  checkBoxID -> 'id' of the checkbox element
			setCheckedValue -> method to set the current checked value of the checkbox on the parent 
			labelText -> label to display with the checkbox
			checkBoxName ->	name for the checkbox
	=========================================================
*/

import React, { Component } from 'react';

// React-Bootstrap imports
import { Row, Col, ProgressBar } from 'react-bootstrap';

// Import style from Home.css file
import styles from './Home.css';

// Import components used in this container
import ErrorContainer from '../../components/Home/ErrorContainer';
import ProgressiveForm from '../../components/Home/ProgressiveForm';
import Success from '../../components/Home/Success';
import LoaderModal from '../../components/LoaderModal/LoaderModal';

import { connect } from 'react-redux';

// import isEqual method of lodash to deep check objects
// Have used it in checking error responses from the store {which comes with timestamp}
import isEqual from 'lodash.isequal';

// imported actions from the reducers
import { validateInput, 
         clearInputValidationData, 
         submitForm,
         resetSubmitFormData } from '../../reducers/form';

import { validateForm } from '../../utils/validations'

// decorator to connect functions and state data from the store to the container
@connect((state) => {
  return {
    checkInputCall: state.form.checkInputCall,
    checkInputSuccess: state.form.checkInputSuccess,
    checkInputFail: state.form.checkInputFail,
    submitFormCall: state.form.submitFormCall,
    submitFormSuccess: state.form.submitFormSuccess,
	  submitFormFail: state.form.submitFormFail
  };
 },{
  validateInput,
  clearInputValidationData,
  submitForm,
  resetSubmitFormData
 })

export default class Home extends Component {

  constructor(props) {
    super(props);
    /**
     * The initial state of the home page
    */
    this.state = {
      showError: false, //to show error div or not
      errorMessage: "Something went wrong",
      checkedValue: [], //stores the current checked value of the form
      toggleValue: null, //stores the current radio selection value of the form 
      textValue: null, //stores the current validated text input value of the form
      selectValue: null, //stores the current select dropdown value of the form
      showCurrentState: 'step1', // 'step2', 'step3', 'step4' 'submitButton'
      requiredErrorStep1: false, //show the input is required error message or not
      requiredErrorStep2: false, //show the input is required error message or not
      requiredErrorStep3: false, //show the input is required error message or not
      requiredErrorStep4: false, //show the input is required error message or not
      stepsCompleted: [], //Array to store the steps completed; used to show the progressbar
      percentageCompleted: null //stores the current progress in percentage
    }
  }

  /*
		'componentWillReceiveProps' LifeCycle method of React
		USE: handles error response from the input validation and form submission call
	*/
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.checkInputFail && !(isEqual(nextProps.checkInputFail, this.props.checkInputFail))){
      this.showErrorMessage(nextProps.checkInputFail.error);
    }
    if(nextProps.submitFormFail && !(isEqual(nextProps.submitFormFail, this.props.submitFormFail))){
      this.showErrorMessage(nextProps.submitFormFail.error, "submitForm");
    }
  }

  /*
		Function to hide error message div by setting showError to false
	*/
  hideErrorMessage = () => {
    this.setState({
      showError: false,
      errorMessage: "Something went wrong"
    })
  }

  /*
		Function to show error message div
	*/
  showErrorMessage = (err, origin) => {
    this.setState({
      showError: true,
      errorMessage: err.message || "Something went wrong. Please try again."
    })
    // setTimeout to hide the message div automatically
    setTimeout(() => {
      this.setState({
        showError: false,
        errorMessage: "Something went wrong"
      });
      // if the origin of this call is from submit form error response, reset the form submit data in the store
      if(origin && origin === "submitForm"){
        const { resetSubmitFormData } = this.props;
        resetSubmitFormData();
      }
    }, 3000)
  }

  /*
		Function to handle whether to show next step or not
	*/
  showNextStep = (currentStep) => {
    switch(currentStep){
      case 'step1':
        this.setState({
          showCurrentState: 'step2'
        });
        break;
      
      case 'step2':
        this.setState({
          showCurrentState: 'step3'
        });
        break;
      
      case 'step3':
        this.setState({
          showCurrentState: 'step4'
        });
        break;

      case 'step4':
        this.setState({
          showCurrentState: 'submitButton'
        });
        break;

      default:
        break;
    }
  }
  
  /*
		Function to set the checkbox current value to state
	*/
  setCheckedValue = (value, isChecked) => {
    this.unsetFormRequiredError('requiredErrorStep1');
    let checkedValueArray = this.state.checkedValue;
    
    if(isChecked){
      // selected
      if(checkedValueArray.indexOf(value) === -1){
        checkedValueArray.push(value);
      }
    }else{
      // unselected
      const index = checkedValueArray.indexOf(value);
      if (index > -1) {
        checkedValueArray.splice(index, 1);
      }
    }
    this.setState({
      checkedValue: checkedValueArray
    })

    // if atleast 1 checkbox is checked, consider this field complete
    if(checkedValueArray.length > 0){
      this.addStepsCompleted("step1");
    }else{
      this.removeStepsCompleted("step1");
    }
    // show next step
    this.showNextStep('step1');
  }

  /*
		Function to set current radio selection value to state
	*/
  setToggleValue = (value) => {
    this.unsetFormRequiredError('requiredErrorStep2'); //Not needed though
    if(value){
      this.setState({
        toggleValue: value
      })
      // this step is completed
      this.addStepsCompleted("step2")
      // show next step
      this.showNextStep('step2');
    }
  }

  /*
		Function to set validated input value to state
	*/
  setTextValue = (value) => {
    this.unsetFormRequiredError('requiredErrorStep3');
    if(value && value!==""){
      this.setState({
        textValue: value
      })
      this.showNextStep('step3');
      this.addStepsCompleted("step3");
    }
  }

  /*
		Function to unset the existing value of the input in teh state
	*/
  unSetTextValue = () => {
    this.unsetFormRequiredError('requiredErrorStep3');
    this.setState({
      textValue: null
    })
    this.removeStepsCompleted("step3")
  }

  /*
		Function to set current dropdown select value to state
	*/
  setSelectValue = (value) => {
    // unset required error state while setting data again
    this.unsetFormRequiredError('requiredErrorStep4');
    // console.log("Select value:", value);
    // set the value or null in the state
    if(value !== ""){
      this.setState({
        selectValue: value
      })
      this.showNextStep('step4');
      this.addStepsCompleted("step4");
    }else{
      this.setState({
        selectValue: null
      })
      this.removeStepsCompleted("step4")
    }
  }
  /*
		Function to check whether to submit the form or show error
	*/
  submitFormData = () => {
    // form data Object
    const formData = {
      a: this.state.checkedValue,
      b: this.state.toggleValue,
      text: this.state.textValue,
      c: this.state.selectValue
    };
    // console.log("form data", formData);
    // submit form if data is valid or show appropriate error
    if(validateForm(formData)){
      const { submitForm } = this.props;
      submitForm(formData);
    }else{
      // Handle form validation error here
      // console.log("Form Data Not Complete");
      this.handleFormError(formData);
    }
  }

  /*
		Function to handle error while form validation
	*/
  handleFormError = ({a, b, text, c}) => {

    let count = 0; //counter to store how many states are empty while submission

    if(!a || a.length === 0){
      count++;
      this.setState({
        requiredErrorStep1: true
      })
    }
    if(!b || b.trim() === ""){
      count++;
      this.setState({
        requiredErrorStep2: true
      })
    }
    if(!text || text.trim() === 0){
      count++;
      this.setState({
        requiredErrorStep3: true
      })
    }
    if(!c || c.trim() === 0){
      count++;
      this.setState({
        requiredErrorStep4: true
      })
    }
    // set progress bar according to the number of incomplete steps
    this.setProgressBarState(count);
    this.showErrorMessage({message: "Please check the form inputs and try submitting again"})
  }

  /*
		Function to add a step to the this.state.stepsCompleted array in state
	*/
  addStepsCompleted = (step) => {
    const index = this.state.stepsCompleted.indexOf(step);
    if (index === -1) {
      this.setState(prevState => ({
        arrayvar: [...prevState.stepsCompleted, step]
      }))
      // this.state.stepsCompleted.push(step);
    }
    this.setProgressBarState();
  }

  /*
		Function to remove a step from the this.state.stepsCompleted array in state
	*/
  removeStepsCompleted = (step) => {
    const index = this.state.stepsCompleted.indexOf(step);
    if (index > -1) {
      this.state.stepsCompleted.splice(index, 1);
    }
    this.setProgressBarState();
  }

  /*
		Function to calculate and set the progress bar state 
	*/
  setProgressBarState = () => {
    if(this.state.stepsCompleted.length > 0){
      const percentage = this.state.stepsCompleted.length * 25;
      this.setState({
        percentageCompleted: percentage
      })
    }else{
      this.setState({
        percentageCompleted: null
      })
    }
  }

  /*
		Function unset empty error message state for each step
	*/
  unsetFormRequiredError = (stepName) => {
    this.setState({
      [stepName]: false
    })
  }

  /*
		Function to reset the entire form and store data to initial state
	*/
  resetFormData = () => {
    this.setState({
      showError: false,
      errorMessage: "Something went wrong",
      checkedValue: [],
      toggleValue: null,
      textValue: null,
      selectValue: null,
      showCurrentState: 'step1', // 'step2', 'step3', 'step4' 'submitButton'
      requiredErrorStep1: false,
      requiredErrorStep2: false,
      requiredErrorStep3: false,
      requiredErrorStep4: false,
      stepsCompleted: [],
      percentageCompleted: null
    });
    // Once we've reset the state, we reset the store data
    const { resetSubmitFormData, clearInputValidationData } =  this.props;
    clearInputValidationData();
    resetSubmitFormData();

  }

  render() {
    
    // props
    const { validateInput, 
            checkInputSuccess, 
            checkInputCall, 
            checkInputFail, 
            clearInputValidationData, 
            submitForm,
            submitFormCall,
            submitFormSuccess,
            submitFormFail } = this.props;

    return (

      <Row className={`${styles.mainWrapper}`}>

        {(this.state.percentageCompleted && !submitFormSuccess) ? 
        
          <div className={`${styles.progressBarHolder}`}>

            <ProgressBar bsStyle="success" 
                         now={this.state.percentageCompleted} 
                         label={<span className={`${styles.progressBarText}`}>{this.state.percentageCompleted}%</span>}
                         className={`${styles.progressBar}`}/>

          </div> :

          null

        }

        <LoaderModal showState={submitFormCall}/>

        <Col xs={12} className="">

          {(this.state.showError)?
            
            <ErrorContainer errorMessage={this.state.errorMessage}
                            hideErrorMessage={this.hideErrorMessage}/> : 

            null

          }

          {(submitFormSuccess) ? 

            <Success resetFormData={this.resetFormData}/> :
          
            <ProgressiveForm setCheckedValue={this.setCheckedValue}
                              setSelectValue={this.setSelectValue}
                              validateInput={validateInput}
                              showCurrentState={this.state.showCurrentState}
                              setToggleValue={this.setToggleValue}
                              setTextValue={this.setTextValue}
                              unSetTextValue={this.unSetTextValue}
                              checkInputSuccess={checkInputSuccess}
                              checkInputCall={checkInputCall}
                              clearInputValidationData={clearInputValidationData}
                              checkInputFail={checkInputFail}
                              submitFormData={this.submitFormData}
                              submitFormFail={submitFormFail}
                              requiredErrorStep1={this.state.requiredErrorStep1}
                              requiredErrorStep2={this.state.requiredErrorStep2}
                              requiredErrorStep3={this.state.requiredErrorStep3}
                              requiredErrorStep4={this.state.requiredErrorStep4}/>

          }
                    
        </Col>

      </Row>

    )

  }

}

Home.propTypes = {

};




