import React, { Component } from 'react';

import { Row, Col } from 'react-bootstrap';

import styles from './Home.css';

import ErrorContainer from '../../components/Home/ErrorContainer';
import ProgressiveForm from '../../components/Home/ProgressiveForm';

import LoaderModal from '../../components/LoaderModal/LoaderModal';

import { connect } from 'react-redux';

import isEqual from 'lodash.isequal';

import { validateInput, clearInputValidationData, submitForm } from '../../reducers/form';

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
  submitForm
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
      requiredErrorStep2: false
    }
  }

  componentWillMount = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.checkInputFail && !(isEqual(nextProps.checkInputFail, this.props.checkInputFail))){
      this.showErrorMessage(nextProps.checkInputFail);
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

  showErrorMessage = (err) => {
    this.setState({
      showError: true,
      errorMessage: err.message
    })
    setTimeout(() => {
      this.setState({
        showError: false,
        errorMessage: "Something went wrong"
      })
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
    this.showNextStep('step1');
  }

  setToggleValue = (value) => {
    if(value){
      this.setState({
        toggleValue: value
      })
      this.showNextStep('step2');
    }
    
  }

  setTextValue = (value) => {
    if(value && value!==""){
      this.setState({
        textValue: value
      })
      this.showNextStep('step3');
    }
  }
  unSetTextValue = () => {
    this.setState({
      textValue: null
    })
  }

  setSelectValue = (value) => {
    // console.log("Select value:", value);
    if(value !== ""){
      this.setState({
        selectValue: value
      })
      this.showNextStep('step4');
    }else{
      this.setState({
        selectValue: null
      })
    }
  }

  submitFormData = () => {

    const formData = {
      a: this.state.checkedValue,
      b: this.state.toggleValue,
      text: this.state.textValue,
      c: this.state.selectValue
    };
    // console.log("form data", formData);
    if(validateForm(formData)){
      const { submitForm } = this.props;
      submitForm(formData);
    }else{
      // Handle form validation error here
      console.log("Form Data Not Complete")
    }
  }

  render() {
    
    const { validateInput, 
            checkInputSuccess, 
            checkInputCall, 
            checkInputFail, 
            clearInputValidationData, 
            submitForm,
            submitFormCall } = this.props;

    return (

      <Row className={`${styles.mainWrapper}`}>

        <LoaderModal showState={submitFormCall}/>

        <Col xs={12} className="">

          {(this.state.showError)?
            
            <ErrorContainer errorMessage={this.state.errorMessage}
                            hideErrorMessage={this.hideErrorMessage}/> : 

            null

          }

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
                           submitFormData={this.submitFormData}/>
                    
        </Col>

      </Row>

    )

  }

}

Home.propTypes = {

};
