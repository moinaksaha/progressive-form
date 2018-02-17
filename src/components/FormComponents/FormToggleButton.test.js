import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import FormToggleButton from './FormToggleButton';

const mockRemoveGreeting = jest.fn();

// describe what we are testing
describe('Form Toggle Component', () => {
 
    it('renders correctly', () => {
        const successSnap = renderer.create(
          <FormToggleButton />
        ).toJSON();
        expect(successSnap).toMatchSnapshot();
    });

})


describe('Radio Toggle input', () => {
  
    it('should respond to change event and change the state of the Login Component', () => {
        
        const wrapper = shallow(<FormToggleButton setToggleValue={mockRemoveGreeting}/>);
        wrapper.find('input').simulate('change', { target: { checked: true } });
        expect(mockRemoveGreeting).toBeCalled();
    })
})