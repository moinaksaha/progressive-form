import React, { Component } from 'react';

import { Grid, Row, Col, form, FormGroup, Checkbox, Radio, ControlLabel, Button, option, FormControl } from 'react-bootstrap';

import styles from './Home.css';

import ErrorContainer from '../../components/Home/ErrorContainer';
import ProgressiveForm from '../../components/Home/ProgressiveForm';

import { connect } from 'react-redux';

import isEqual from 'lodash.isequal';

import { validateInput } from '../../reducers/form';

@connect((state) => {
  return {
    testCall: state.form.testCall,
    testCallSuccess: state.form.testCallSuccess,
    testCallFail: state.form.testCallFail
  };
 },{
  validateInput
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
      showCurrentState: 'step1' // 'step2', 'step3', 'step4' 'submitButton'
    }
  }

  componentWillMount = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.testCallFail && !(isEqual(nextProps.testCallFail, this.props.testCallFail))){
      this.showErrorMessage(nextProps.testCallFail);
    }
  }

  componentDidUpdate = () => {
    console.log("========================")
    console.log("a: ", this.state.checkedValue);
    console.log("b: ", this.state.toggleValue);
    console.log("text: ", this.state.textValue);
    console.log("c: ", this.state.selectValue);
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
    if(value && value!=""){
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

  render() {
    
    const { validateInput, testCallSuccess, testCall, testCallFail } = this.props;

    return (

      <Row className={`${styles.mainWrapper}`}>

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
                           testCallSuccess={testCallSuccess}
                           testCall={testCall}/>
                    
        </Col>

      </Row>

    )

  }

}

Home.propTypes = {

};
