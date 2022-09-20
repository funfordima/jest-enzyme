import React from "react";
import Posts from "./posts";

const setUp = () => shallow(<Posts />);

describe('Post component', () => {
  const DEFAULT_PAGE = 10;
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it('should render Posts component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render Posts component with children', () => {
    expect(component).toMatchSnapshot();
  });

  describe('Posts handlers', () => {
    it('should handle search input value', () => {
      expect(component.state().searchQuery).toBe('');
      instance.handleInputChange({ target: { value: 'test' } });
      expect(component.state().searchQuery).toBe('test');
    });

    it('should handle hits change per page', () => {
      expect(component.state().hitsPerPage).toBe(20);
      instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } });
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
      expect(component.state().page).toBe(0);
    });

    it('should handle change page by "Enter" click', () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: 'Enter' });
      expect(component.state().page).toBe(0);
    });

    it('should not change page by not clicking "Enter"', () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: 'a' });
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });
  });
});
