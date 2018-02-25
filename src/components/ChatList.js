import React from 'react';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import titleInitials from '../utils/title-initials';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll'
  }
});

const ChatList = ({ classes, chats }) => {
  return (
    <List className={classes.chatsList}>
      {chats.map((chat, index) => (
        <ListItem key={index} button>
          <Avatar>{chat.title && titleInitials(chat.title)}</Avatar>
          <ListItemText primary={chat.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(ChatList);
