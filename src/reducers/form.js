/*
    Reducer for the function promises
*/

// Import the checkIt and submitIt functions from the given helper function 'api.js'
import { checkIt, submitIt } from '../utils/api';

export const CHECK_INPUT_CALL = 'form/CHECK_INPUT_CALL'
export const CHECK_INPUT_SUCCESS = 'form/CHECK_INPUT_SUCCESS'
export const CHECK_INPUT_FAIL = 'form/CHECK_INPUT_FAIL'

export const SUBMIT_FORM_CALL = 'form/SUBMIT_FORM_CALL'
export const SUBMIT_FORM_SUCCESS = 'form/SUBMIT_FORM_SUCCESS'
export const SUBMIT_FORM_FAIL = 'form/SUBMIT_FORM_FAIL'

export const RESET_INPUT_CALL_DATA = 'form/RESET_INPUT_CALL_DATA'
export const RESET_SUBMIT_FORM_DATA = 'form/RESET_SUBMIT_FORM_DATA'

//Initial state of the reducer
const initialState = {
    checkInputCall: false, //Key to store the Fetching state of the input validation promise; true -> promise is still fetching
    checkInputSuccess: null, //Key to store the Success Response of the input validation promise
    checkInputFail: null, //Key to store the Error Response of the input validation promise
    submitFormCall: false, //Key to store the Fetching state of the form submit promise; true -> promise is still fetching
    submitFormSuccess: null, //Key to store the Success Response of the form submit promise
    submitFormFail: null //Key to store the Error Response of the form submit promise
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_INPUT_CALL:
        return {
            ...state,
            checkInputCall: true
        }
    
    case CHECK_INPUT_SUCCESS:
        return {
            ...state,
            checkInputCall: false,
            checkInputSuccess: action.data || true
        }
    
    case CHECK_INPUT_FAIL:
        return {
            ...state,
            checkInputCall: false,
            checkInputFail: action.error || true
        }
    
    case RESET_INPUT_CALL_DATA:
        return {
            ...state,
            checkInputCall: false,
            checkInputSuccess: null,
            checkInputFail: null
        }
    
    case SUBMIT_FORM_CALL:
        return {
            ...state,
            submitFormCall: true
        }
    
    case SUBMIT_FORM_SUCCESS:
        return {
            ...state,
            submitFormCall: false,
            submitFormSuccess: action.data || true
        }
    
    case SUBMIT_FORM_FAIL:
        return {
            ...state,
            submitFormCall: false,
            submitFormFail: action.error || true
        }

    case RESET_SUBMIT_FORM_DATA:
        return {
            ...state,
            submitFormCall: false,
            submitFormSuccess: null,
            submitFormFail: null
        }

    default:
      return state
  }
}

/*
        Function to do the 'checkIt' call with the input value and appropriately handle the response
        - added timeStamp to error response to make every response unique and accordingly handle them
*/
export const validateInput = (value) => {
    return dispatch => {
        dispatch({
            type: CHECK_INPUT_CALL
        })

        checkIt(value)
        .then((response) => {
            dispatch({
                type: CHECK_INPUT_SUCCESS,
                data: response
            })
        }).catch((err) => {
            dispatch({
                type: CHECK_INPUT_FAIL,
                error: {
                    error: err,
                    timeStamp: Date.now()
                }
            })
        })
    }
}

/*
        Function to do the 'submitIt' call with the form data and appropriately handle the response
        - added timeStamp to error response to make every response unique and accordingly handle them
*/
export const submitForm = (value) => {
    return dispatch => {
        dispatch({
            type: SUBMIT_FORM_CALL
        })

        submitIt(value)
        .then((response) => {
            dispatch({
                type: SUBMIT_FORM_SUCCESS,
                data: response
            })
        }).catch((err) => {
            dispatch({
                type: SUBMIT_FORM_FAIL,
                error: {
                    error: err,
                    timeStamp: Date.now()
                }
            })
        })
    }
}

/*
    Function to clear the input validation state before re-validating input text again
*/
export const clearInputValidationData = () => {
    return {
        type: RESET_INPUT_CALL_DATA
    }
}

/*
    Function to clear the submit form state before re-submitting form again
*/
export const resetSubmitFormData = () => {
    return {
        type: RESET_SUBMIT_FORM_DATA
    }
}




