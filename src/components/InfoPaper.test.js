/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import InfoPaper from './InfoPaper';

describe('<InfoPaper />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InfoPaper />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<InfoPaper />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
