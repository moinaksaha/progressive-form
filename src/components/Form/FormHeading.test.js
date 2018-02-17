import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FormHeading from './FormHeading';
import styles from '../../containers/Home/Home.css';

// describe what we are testing
describe('Text Input Component', () => {
 
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
      expect(mount(<FormHeading />).exists(<div className={`${styles.formHeading} text-center`}>Progressive Form</div>)).toBe(true)
    })
})