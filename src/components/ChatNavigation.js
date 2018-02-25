import React from 'react';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';

const ChatNavigation = () => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction label='My Chats' icon={<RestoreIcon />} />
      <BottomNavigationAction label='Explore' icon={<ExploreIcon />} />
    </BottomNavigation>
  );
};

export default ChatNavigation;
