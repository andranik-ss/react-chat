/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatHeader from './ChatHeader';

jest.mock('./Avatar', () => () => 'Avatar');
jest.mock('./ChatMenu', () => () => 'ChatMenu');
jest.mock('./UserMenu', () => () => 'UserMenu');

const mockProps = {
  user: {
    username: 'test',
    isMember: true,
    isCreator: true,
  },
  activeChat: {
    _id: '1',
    title: 'test',
  },
  messages: [
    {
      chatId: '123',
      content: 'content',
      sender: {},
      createdAt: '2018-03-08T13:57:58.706Z',
    },
  ],
  isConnected: true,
  actions: {
    logout: jest.fn(),
    leaveChat: jest.fn(),
    deleteChat: jest.fn(),
    editUser: jest.fn(),
  },
  hasShift: false,
};

describe('<ChatHeader />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatHeader {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatHeader {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without active chat', () => {
    const tree = renderer.create(<ChatHeader {...mockProps} activeChat={null} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
