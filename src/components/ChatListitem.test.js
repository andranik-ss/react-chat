/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatListItem from './ChatListItem';

jest.mock('./Avatar', () => () => 'Avatar');
jest.mock('moment', () => () => ({ fromNow: () => '2 days ago' }));

const mockProps = {
  chatId: '1',
  title: 'test',
  active: false,
  disabled: false,
  createdAt: '2018-03-08T13:57:58.706Z',
};

describe('<ChatList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ChatListItem {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  /* eslint-disable react/jsx-indent */
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatListItem {...mockProps} />
              </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly disabled', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatListItem {...mockProps} disabled />
              </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly active', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatListItem {...mockProps} active />
              </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
