import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll'
  },
  active: {
    backgroundColor: '#eeeeee'
  }
});

const ChatList = ({ classes, chats, setActiveChat, activeId }) => {
  return (
    <List className={classes.chatsList}>
      {chats.map(chat => (
        <ListItem
          className={classnames(activeId === chat._id && classes.active)}
          key={chat._id}
          button
          onClick={() => setActiveChat(chat._id)}
        >
          <Avatar colorFrom={chat.title}>{chat.title}</Avatar>
          <ListItemText primary={chat.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(ChatList);
