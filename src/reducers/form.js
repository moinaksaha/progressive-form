import { checkIt } from '../utils/api';


export const CHECK_INPUT_CALL = 'form/CHECK_INPUT_CALL'
export const CHECK_INPUT_SUCCESS = 'form/CHECK_INPUT_SUCCESS'
export const CHECK_INPUT_FAIL = 'form/CHECK_INPUT_FAIL'

export const SUBMIT_FORM_CALL = 'form/SUBMIT_FORM_CALL'
export const SUBMIT_FORM_SUCCESS = 'form/SUBMIT_FORM_SUCCESS'
export const SUBMIT_FORM_FAIL = 'form/SUBMIT_FORM_FAIL'

export const INCREMENT = 'form/INCREMENT'
export const DECREMENT_REQUESTED = 'form/DECREMENT_REQUESTED'
export const DECREMENT = 'form/DECREMENT'

const initialState = {
    checkInputCall: false,
    checkInputSuccess: null,
    checkInputFail: null,
    submitFormCall: false,
    submitFormSuccess: null,
    submitFormFail: null,
    count: 0,
    isIncrementing: false,
    isDecrementing: false
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
            checkInputSuccess: true
        }
    
    case CHECK_INPUT_FAIL:
        return {
            ...state,
            checkInputCall: false,
            checkInputFail: true
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
            submitFormSuccess: true
        }
    
    case SUBMIT_FORM_FAIL:
        return {
            ...state,
            submitFormCall: false,
            submitFormFail: true
        }

    default:
      return state
  }
}


export const validateInput = (value) => {
    return dispatch => {

        dispatch({
            type: CHECK_INPUT_CALL
        })

        checkIt(value)
        .then(() => {
            dispatch({
                type: CHECK_INPUT_SUCCESS
            })
        }).catch(() => {
            dispatch({
                type: CHECK_INPUT_FAIL
            })
        })
    }
  }
  


/*



    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }




export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const validateInput = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}

*/





