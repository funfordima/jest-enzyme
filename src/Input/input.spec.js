import React from "react";
import Input from "./input";

describe('Input component', () => {
  it('should render input component', () => {
    const component = shallow(<Input />);

    expect(component).toMatchSnapshot();
  });

  describe('default props', () => {
    it('should use default onChange', () => {
      const result = Input.defaultProps.onChange();

      expect(result).toBe(undefined);
    });

    it('should use default onKeyPress', () => {
      const result = Input.defaultProps.onKeyPress();

      expect(result).toBe(undefined);
    });
  });
});
