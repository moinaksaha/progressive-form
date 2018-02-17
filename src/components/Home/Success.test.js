import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import Success from './Success';

import styles from '../../containers/Home/Home.css';

const mockRemoveGreeting = jest.fn();

// describe what we are testing
describe('Form Submitted Successfully Component', () => {
 
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {

      expect(mount(<Success />).exists(<div className={`${styles.successContainer} text-center center-block`}></div>)).toBe(true)

    });

    it('calls the passed in resetFormData function when button is clicked', () => {

        mount(<Success resetFormData={mockRemoveGreeting}/>).find('button').simulate('click');

        expect(mockRemoveGreeting).toBeCalled();

    });

    it('renders correctly', () => {
        const successSnap = renderer.create(
          <Success />
        ).toJSON();
        expect(successSnap).toMatchSnapshot();
    });
})