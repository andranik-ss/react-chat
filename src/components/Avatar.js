import React from 'react';
import MuiAvatar from 'material-ui/Avatar';
import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const Avatar = ({ children, colorFrom }) => {
  return (
    <MuiAvatar style={{ backgroundColor: getColor(colorFrom) }}>
      {titleInitials(children)}
    </MuiAvatar>
  );
};

export default Avatar;
