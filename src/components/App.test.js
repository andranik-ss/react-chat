/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('../containers/PrivateRoute', () => () => 'PrivateRoute');
jest.mock('../containers/ChatPage', () => () => 'ChatPage');
jest.mock('../containers/WelcomePage', () => () => 'WelcomePage');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
