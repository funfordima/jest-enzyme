import React from "react";
import Pagination from './pagination';

const setUp = (props) => shallow(<Pagination {...props} lastPage={20} />);

describe('Pagination component', () => {
  it('should render pagination without props', () => {
    const component = shallow(<Pagination />);

    expect(component).toMatchSnapshot();
  });

  it('should render pagination with props', () => {
    const component = setUp();

    expect(component).toMatchSnapshot();
  });

  it('should render pagination for last pages', () => {
    const component = setUp({ page: 15 });

    expect(component).toMatchSnapshot();
  });

  it('should render pagination without 3 dots in the middle', () => {
    const component = setUp({ page: 16 });

    expect(component).toMatchSnapshot();
  });

  it('should render pagination with 3 dots and 3 buttons in the end', () => {
    const component = setUp({ page: 19 });

    expect(component).toMatchSnapshot();
  });

  describe('default props', () => {
    it('should use default onChange', () => {
      const result = Pagination.defaultProps.onClick();

      expect(result).toBe(undefined);
    });
  });
});
