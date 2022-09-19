import React from "react";
import Select from "./select";

const options = {
  handleChange: () => 'Test',
  options: [
    {
      value: 'Test value 1',
      label: 'Test label 1',
    },
    {
      value: 'Test value 2',
      label: 'Test label 2',
    }
  ],
  value: 0,
};

const setUp = (props) => shallow(<Select {...props} />);

describe('Select component', () => {
  describe('Has props', () => {
    const component = setUp(options);
    it('should render select element', () => {
      const select = component.find('select');

      expect(select).toHaveLength(1);
    });

    it('should render 2 options', () => {
      const options = component.find('option');

      expect(options).toHaveLength(2);
    });
  });

  describe('Has no props', () => {
    it('should render placeholder', () => {
      const component = shallow(<Select />);
      const placeholder = component.find('.placeholder');

      expect(placeholder).toHaveLength(1);
    });
  });

  describe('Default props', () => {
    it('should use default handle change props', () => {
      const result = Select.defaultProps.handleChange();

      expect(result).toBe('Test');
    });
  });
});