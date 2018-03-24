/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NewChatButton from './NewChatButton';

const mockProps = {
  disabled: false,
  createChat: jest.fn(),
};

describe('<NewChatButton />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewChatButton {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<NewChatButton {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly disabled', () => {
    const tree = renderer.create(<NewChatButton {...mockProps} disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
