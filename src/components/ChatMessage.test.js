/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMessage from './ChatMessage';

// Return a fixed timestamp when moment().fromNow() is called
jest.mock('moment', () => () => ({
  fromNow: () => '2 days ago',
  isValid: () => true,
  format: () => '15:00',
}));

const mockProps = {
  content: 'test message',
  sender: {
    _id: '123',
    username: 'test',
  },
  user: {
    _id: '123',
  },
  createdAt: '2018-03-08T13:57:58.706Z',
  statusMessage: false,
};

describe('<ChatMessage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMessage {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly message', () => {
    const tree = renderer.create(<ChatMessage {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders name of user correctly', () => {
    const tree = renderer
      .create(<ChatMessage
        {...mockProps}
        sender={{
            _id: '12345',
            username: 'me',
            firstName: 'Name',
            lastName: 'Surname',
          }}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders message from other users', () => {
    const tree = renderer
      .create(<ChatMessage
        {...mockProps}
        sender={{
            _id: '54321',
            username: 'someone',
          }}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders name of other users correctly', () => {
    const tree = renderer
      .create(<ChatMessage
        {...mockProps}
        sender={{
            _id: '54321',
            username: 'someone',
            firstName: 'Name',
            lastName: 'Surname',
          }}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders status message', () => {
    const tree = renderer.create(<ChatMessage {...mockProps} statusMessage />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders name in status message correctly', () => {
    const tree = renderer
      .create(<ChatMessage
        {...mockProps}
        sender={{
            _id: '54321',
            username: 'someone',
            firstName: 'Name',
            lastName: 'Surname',
          }}
        statusMessage
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
