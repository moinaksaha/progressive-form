import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Step4 from './Step4';

describe('<Step4 />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Step4 showRequired="testRequiredProperty" />);
    expect(wrapper.props().showRequired).to.equal('testRequiredProperty');
    wrapper.setProps({ showRequired: 'demo test' });
    expect(wrapper.props().showRequired).to.equal('demo test');
  });
});