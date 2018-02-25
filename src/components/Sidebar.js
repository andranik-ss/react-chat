import React from 'react';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import ChatList from './ChatList';
import NewChatButton from './NewChatButton';
import ChatNavigation from './ChatNavigation';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 320
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
});

const Sidebar = ({ classes, chats }) => {
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <TextField fullWidth margin='normal' placeholder='Search chats...' />
      </div>
      <Divider />
      <ChatList chats={chats} />
      <NewChatButton />
      <ChatNavigation />
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
