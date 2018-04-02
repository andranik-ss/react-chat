/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import SignUpForm from './SignUpForm';

const mockProps = {
  onSubmit: jest.fn(),
};

describe('<SignUpForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignUpForm {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<SignUpForm {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
