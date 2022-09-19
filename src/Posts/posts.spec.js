import React from "react";
import Posts from "./posts";

describe('Post component', () => {
  it('should render Posts component', () => {
    const component = shallow(<Posts />);

    expect(component).toMatchSnapshot();
  });

  it('should render Posts component with children', () => {
    const component = render(<Posts />);

    expect(component).toMatchSnapshot();
  });
});