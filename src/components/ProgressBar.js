import React from 'react';
import { LinearProgress } from 'material-ui/Progress';

const ProgressBar = props => (
  <LinearProgress color='secondary' variant='query' {...props} />
);

export default ProgressBar;
