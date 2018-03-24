/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMenu from './ChatMenu';

const mockProps = {
  user: {
    isCreator: false,
  },
  isConnected: false,
  actions: {
    deleteChat: jest.fn(),
    leaveChat: jest.fn(),
  },
};

describe('<ChatMenu />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMenu {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatMenu {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
