/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMessageList from './ChatMessageList';

describe('<ChatMessageList />', () => {
  const user = {
    username: 'test',
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMessageList user={user} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatMessageList user={user} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
