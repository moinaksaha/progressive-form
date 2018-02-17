import * as form from './form';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect' // You can use any testing library
import JasmineExpect from 'jasmine-expect';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create an action to reset the input call state data', () => {
        const expectedAction = {
            type: form.RESET_INPUT_CALL_DATA
        }
      expect(form.clearInputValidationData()).toEqual(expectedAction)
    })
})

describe('async actions', () => {

    it('creates CHECK_INPUT_CALL, CHECK_INPUT_FAIL with error when wrong input passed', () => {

        const expectedActions = [
            { 
                type: form.CHECK_INPUT_CALL 
            },
            { 
                type: form.CHECK_INPUT_FAIL,
                error: {
                    error: new Error('Value should start with `@`'),
                    timeStamp: Date.now()
                }
            }
        ]

        const store = mockStore();

        return store.dispatch(form.validateInput('moinak')).then(() => {

            expect(store.getActions()).toBeArrayOfObjects();

        })

    })

})