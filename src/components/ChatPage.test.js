/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import ChatPage from './ChatPage';

jest.mock('./Sidebar', () => () => './Sidebar');
jest.mock('./Chat', () => () => './Chat');
jest.mock('./ChatHeader', () => () => './ChatHeader');
jest.mock('./ErrorMessage', () => () => './ErrorMessage');

const mockProps = {
  actions: {
    fetchAllChats: jest.fn(),
    fetchMyChats: jest.fn(),
    setActiveChat: jest.fn(),
    socketsConnect: jest.fn(),
    mountChat: jest.fn(),
    unmountChat: jest.fn(),
    logout: jest.fn(),
    createChat: jest.fn(),
    joinChat: jest.fn(),
    leaveChat: jest.fn(),
    deleteChat: jest.fn(),
    sendMessage: jest.fn(),
    editUser: jest.fn(),
  },
  chats: {
    my: [
      {
        _id: '1',
        title: 'test',
        createAt: '2018-03-08T13:57:58.706Z',
      },
    ],
    all: [
      {
        _id: '1',
        title: 'test',
        createAt: '2018-03-08T13:57:58.706Z',
      },
    ],
    active: {
      _id: '1',
      title: 'test',
    },
  },
  user: {
    username: 'username',
    isMember: true,
    isCreator: true,
  },
  messages: [
    {
      _id: '123',
      chatId: '1',
      content: 'test message',
      sender: {
        _id: '321',
        username: 'test',
      },
      createdAt: '2018-03-08T13:57:58.706Z',
    },
    {
      _id: '124',
      chatId: '1',
      content: 'Yes, it working!',
      sender: {
        _id: '123',
        username: 'someone',
      },
      createdAt: '2018-03-08T14:00:00.706Z',
    },
  ],
  isConnected: true,
  error: null,
};

describe('<ChatPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter initialEntries={['/chat/1']}>
        <Route path="/chat/:chatId?" render={props => <ChatPage {...mockProps} {...props} />} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
