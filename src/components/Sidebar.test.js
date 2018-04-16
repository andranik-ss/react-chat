/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Sidebar from './Sidebar';

jest.mock('./ChatList', () => () => 'ChatList');
jest.mock('./NewChatButton', () => () => 'NewChatButton');

global.matchMedia = () => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

const mockProps = {
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
  actions: {
    createChat: jest.fn(),
    openSidebar: jest.fn(),
    closeSidebar: jest.fn(),
  },
  isConnected: false,
  open: true,
};

describe('<Sidebar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Sidebar {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly isConnected', () => {
    const tree = renderer.create(<Sidebar {...mockProps} isConnected />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
