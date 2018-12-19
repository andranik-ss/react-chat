/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMessageList from './ChatMessageList';

describe('<ChatMessageList />', () => {
  const mockProps = {
    user: {
      username: 'test',
    },
    readMessage: jest.fn(),
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMessageList {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatMessageList {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
