import React from "react";
import Posts from "./posts";

import { NEWS, HITS, BASE_PATH, SEARCH_PATH, SEARCH_PARAM, PAGE_PARAM } from "./constants";

const setUp = () => shallow(<Posts />);

const mockJsonPromise = Promise.resolve({ hits: NEWS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });

globalThis.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

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

  it('should call fetch in componentDidMount', () => {
    expect(globalThis.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${''}&${20}&${PAGE_PARAM}${0}`);
  });

  describe('update page method', () => {
    it('should update state \'page\' value', () => {
      instance.updatePage(DEFAULT_PAGE);

      expect(component.state().page).toBe(DEFAULT_PAGE);
    });

    it('should call fetch with given argument', () => {
      instance.updatePage(DEFAULT_PAGE);

      expect(globalThis.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${''}&${20}&${PAGE_PARAM}${DEFAULT_PAGE}`);
    });
  });

  describe('handlePageChange method', () => {
    it('should call updatePage with given argument', () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('1') },
      });

      expect(instance.updatePage).toHaveBeenCalledWith(1);
    });

    it('should call updatePage with increased value', () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('prev') },
      });

      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE - 1);
    });

    it('should call updatePage with decreased value', () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('next') },
      });

      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE + 1);
    });

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
