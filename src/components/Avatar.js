import React from 'react';
import MuiAvatar from 'material-ui/Avatar';
import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const Avatar = ({ children, colorFrom, ...rest }) => {
  return (
    <MuiAvatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
      {titleInitials(children)}
    </MuiAvatar>
  );
};

export default Avatar;
