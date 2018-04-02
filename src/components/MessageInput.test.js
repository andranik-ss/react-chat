/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MessageInput from './MessageInput';

const mockProps = {
  disabled: false,
  sendMessage: jest.fn(),
};

describe('<MessageInput />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageInput {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<MessageInput {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly disabled', () => {
    const tree = renderer.create(<MessageInput {...mockProps} disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
