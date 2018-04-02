/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UserProfile from './UserProfile';

const mockProps = {
  open: false,
  onClose: jest.fn(),
  editUser: jest.fn(),
  user: {
    username: 'test',
  },
};

describe('<UserProfile />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserProfile {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<UserProfile {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
