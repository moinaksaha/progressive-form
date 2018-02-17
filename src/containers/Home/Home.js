import React, { Component } from 'react';

import { Row, Col, ProgressBar } from 'react-bootstrap';

import styles from './Home.css';

import ErrorContainer from '../../components/Home/ErrorContainer';
import ProgressiveForm from '../../components/Home/ProgressiveForm';
import Success from '../../components/Home/Success';

import LoaderModal from '../../components/LoaderModal/LoaderModal';

import { connect } from 'react-redux';

import isEqual from 'lodash.isequal';

import { validateInput, 
         clearInputValidationData, 
         submitForm,
         resetSubmitFormData } from '../../reducers/form';

import { validateForm } from '../../utils/validations'

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
    /**
     * This is for illustration purpose. Since this is empty. It can be removed
    */
    super(props);
    
    this.state = {
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
    }
  }

  componentWillMount = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.checkInputFail && !(isEqual(nextProps.checkInputFail, this.props.checkInputFail))){
      this.showErrorMessage(nextProps.checkInputFail.error);
    }
    if(nextProps.submitFormFail && !(isEqual(nextProps.submitFormFail, this.props.submitFormFail))){
      this.showErrorMessage(nextProps.submitFormFail.error, "submitForm");
    }
  }

  componentDidUpdate = () => {
    
  }

  hideErrorMessage = () => {
    this.setState({
      showError: false,
      errorMessage: "Something went wrong"
    })
  }

  showErrorMessage = (err, origin) => {
    console.log(err)
    this.setState({
      showError: true,
      errorMessage: err.message || "Something went wrong. Please try again."
    })
    setTimeout(() => {
      this.setState({
        showError: false,
        errorMessage: "Something went wrong"
      });
      if(origin && origin === "submitForm"){
        const { resetSubmitFormData } = this.props;
        resetSubmitFormData();
      }
    }, 3000)
  }

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

    if(checkedValueArray.length > 0){
      this.addStepsCompleted("step1");
    }else{
      this.removeStepsCompleted("step1");
    }

    this.showNextStep('step1');
  }

  setToggleValue = (value) => {
    this.unsetFormRequiredError('requiredErrorStep2'); //Not needed though
    if(value){
      this.setState({
        toggleValue: value
      })
      this.addStepsCompleted("step2")
      this.showNextStep('step2');
    }
    
  }

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

  unSetTextValue = () => {
    this.unsetFormRequiredError('requiredErrorStep3');
    this.setState({
      textValue: null
    })
    this.removeStepsCompleted("step3")
  }

  setSelectValue = (value) => {
    this.unsetFormRequiredError('requiredErrorStep4');
    // console.log("Select value:", value);
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

  submitFormData = () => {

    const formData = {
      a: this.state.checkedValue,
      b: this.state.toggleValue,
      text: this.state.textValue,
      c: this.state.selectValue
    };
    console.log("form data", formData);
    if(validateForm(formData)){
      const { submitForm } = this.props;
      submitForm(formData);
    }else{
      // Handle form validation error here
      console.log("Form Data Not Complete");
      this.handleFormError(formData);
    }
  }

  handleFormError = ({a, b, text, c}) => {
    let count = 0;

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
    this.setProgressBarState(count);
    this.showErrorMessage({message: "Please check the form inputs and try submitting again"})
  }

  addStepsCompleted = (step) => {

    const index = this.state.stepsCompleted.indexOf(step);
    if (index === -1) {
      this.state.stepsCompleted.push(step);
    }
    this.setProgressBarState();
  }

  removeStepsCompleted = (step) => {
    const index = this.state.stepsCompleted.indexOf(step);
    if (index > -1) {
      this.state.stepsCompleted.splice(index, 1);
    }
    this.setProgressBarState();
  }

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

  unsetFormRequiredError = (stepName) => {
    this.setState({
      [stepName]: false
    })
  }

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
    })

    const { resetSubmitFormData, clearInputValidationData } =  this.props;
    clearInputValidationData();
    resetSubmitFormData();

  }

  render() {
    
    const { validateInput, 
            checkInputSuccess, 
            checkInputCall, 
            checkInputFail, 
            clearInputValidationData, 
            submitForm,
            submitFormCall,
            submitFormSuccess,
            submitFormFail } = this.props;

    // let submitFormSuccess = true;

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
