import React from 'react';
import Post from './post';

const setUp = (props) => shallow(<Post {...props} />);

describe('should render Post component', () => {
  let component;

  beforeEach(() => component = setUp());
  it('should contain Post wrapper', () => {
    const wrapper = component.find('.post');
    console.log(component.debug());

    expect(wrapper.length).toBe(1);
  });

  it('should contain link wrapper', () => {
    const link = component.find('a');

    expect(link.length).toBe(1);
  });

  it('should render created date', () => {
    const created_at = '18-09-2022';

    component = setUp({ created_at });
    const date = component.find('.date');

    expect(date.text()).toBe(new Date(created_at).toLocaleDateString());
  });
});
