import React from 'react';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';

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
          <Avatar colorFrom={chat.title}>{chat.title}</Avatar>
          <ListItemText primary={chat.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(ChatList);
