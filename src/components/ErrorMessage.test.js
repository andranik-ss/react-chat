/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ErrorMessage from './ErrorMessage';

const mockProps = {
  error: null,
};

describe('<ErrorMessage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ErrorMessage {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ErrorMessage {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<ErrorMessage {...mockProps} error={new Error('test')} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
