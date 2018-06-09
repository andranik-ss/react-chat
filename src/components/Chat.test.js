/* eslint-env jest */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Chat from './Chat';

jest.mock('./ChatMessageList', () => () => 'ChatMessageList');
jest.mock('./MessageInput', () => () => 'MessageInput');

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
  isConnected: false,
  messages: [
    {
      chatId: '123',
      content: 'content',
      sender: {},
      createdAt: '2018-03-08T13:57:58.706Z',
    },
  ],
  actions: {
    joinChat: jest.fn(),
    isConnected: true,
    sendMessage: jest.fn(),
  },
  hasShift: false,
};

describe('<Chat />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Chat {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  /* eslint-disable react/jsx-indent */
  it('renders correctly ', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <Chat {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    /* eslint-enable react/jsx-indent */

    expect(tree).toMatchSnapshot();
  });
});
