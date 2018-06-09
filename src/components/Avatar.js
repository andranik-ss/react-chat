import React from 'react';
import PropTypes from 'prop-types';
import MuiAvatar from '@material-ui/core/Avatar';
import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const Avatar = ({ children, colorFrom, ...rest }) => (
  <MuiAvatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
    {children && titleInitials(children)}
  </MuiAvatar>
);

Avatar.propTypes = {
  children: PropTypes.string,
  colorFrom: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  children: null,
};

export default Avatar;
