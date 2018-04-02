/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserMenu from './UserMenu';

const mockProps = {
  isConnected: false,
  user: {
    username: 'test',
  },
  actions: {
    logout: jest.fn(),
    editUser: jest.fn(),
  },
};

describe('<UserMenu />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserMenu {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<UserMenu {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly is connected', () => {
    const tree = renderer.create(<UserMenu {...mockProps} isConnected />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
