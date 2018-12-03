import React from 'react';
// import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = props => (
  <div>
    <CircularProgress {...props} />
  </div>
);

// Spinner.propTypes = {};

export default Spinner;
